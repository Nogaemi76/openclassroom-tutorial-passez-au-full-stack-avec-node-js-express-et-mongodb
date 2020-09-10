import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Thing } from '../../models/Thing.model';
import { StuffService } from '../../services/stuff.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-new-thing',
  templateUrl: './new-thing.component.html',
  styleUrls: ['./new-thing.component.scss']
})
export class NewThingComponent implements OnInit, OnDestroy {

  public thingForm: FormGroup;
  public loading = false;
  public part: number;
  public userId: string;
  public errorMessage: string;

  private partSub: Subscription;

  constructor(private state: StateService,
              private formBuilder: FormBuilder,
              private stuffService: StuffService,
              private router: Router,
              private auth: AuthService) { }

  ngOnInit() {
    this.state.mode$.next('form');
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
    this.userId = this.part >= 3 ? this.auth.userId : 'userID40282382';
  }

  onSubmit() {
    this.loading = true;
    const thing = new Thing();
    thing.title = this.thingForm.get('title').value;
    thing.description = this.thingForm.get('description').value;
    thing.price = this.thingForm.get('price').value * 100;
    thing.imageUrl = this.thingForm.get('imageUrl').value;
    thing._id = new Date().getTime().toString();
    thing.userId = this.userId;
    this.stuffService.createNewThing(thing).then(
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
      }
    ).catch(
      (error) => {
        this.loading = false;
        this.errorMessage = error.message;
      }
    );
  }

  ngOnDestroy() {
    this.partSub.unsubscribe();
  }

}
