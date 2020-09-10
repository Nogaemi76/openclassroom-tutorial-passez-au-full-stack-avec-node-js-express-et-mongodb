import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StateService } from '../../services/state.service';
import { StuffService } from '../../services/stuff.service';
import { Thing } from '../../models/Thing.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modify-thing',
  templateUrl: './modify-thing.component.html',
  styleUrls: ['./modify-thing.component.scss']
})
export class ModifyThingComponent implements OnInit {

  thing: Thing;
  thingForm: FormGroup;
  loading = false;
  errorMessage: string;
  part: number;

  private partSub: Subscription;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private state: StateService,
              private stuffService: StuffService) { }

  ngOnInit() {
    this.loading = true;
    this.thingForm = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      price: [0, Validators.required],
      imageUrl: [null, Validators.required]
    });
    this.partSub = this.state.part$.subscribe(
      (part) => {
        this.part = part;
      }
    );
    this.state.mode$.next('form');
    this.route.params.subscribe(
      (params) => {
        this.stuffService.getThingById(params.id).then(
          (thing: Thing) => {
            this.thing = thing;
            this.thingForm.get('title').setValue(this.thing.title);
            this.thingForm.get('description').setValue(this.thing.description);
            this.thingForm.get('price').setValue(this.thing.price / 100);
            this.thingForm.get('imageUrl').setValue(this.thing.imageUrl);
            this.loading = false;
          }
        );
      }
    );
  }

  onSubmit() {
    this.loading = true;
    const thing = new Thing();
    thing.title = this.thingForm.get('title').value;
    thing.description = this.thingForm.get('description').value;
    thing.price = this.thingForm.get('price').value * 100;
    thing.imageUrl = this.thingForm.get('imageUrl').value;
    thing._id = new Date().getTime().toString();
    thing.userId = this.thing.userId;
    this.stuffService.modifyThing(this.thing._id, thing).then(
      () => {
        this.thingForm.reset();
        this.loading = false;
        switch (this.part) {
          case 1:
          case 2:
            this.router.navigate(['/part-one/all-stuff']);
            break;
          case 3:
            this.router.navigate(['/part-three/all-stuff']);
            break;
          case 4:
            this.router.navigate(['/part-four/all-stuff']);
            break;
        }
      },
      (error) => {
        this.loading = false;
        this.errorMessage = error.message;
      }
    );
  }

}
