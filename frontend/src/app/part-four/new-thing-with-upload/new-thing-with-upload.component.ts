import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StateService } from '../../services/state.service';
import { StuffService } from '../../services/stuff.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Thing } from '../../models/Thing.model';
import { mimeType } from '../mime-type.validator';

@Component({
  selector: 'app-new-thing-with-upload',
  templateUrl: './new-thing-with-upload.component.html',
  styleUrls: ['./new-thing-with-upload.component.scss']
})
export class NewThingWithUploadComponent implements OnInit {

  public thingForm: FormGroup;
  public loading = false;
  public part: number;
  public userId: string;
  public imagePreview: string;
  public errorMessage: string;

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
      image: [null, Validators.required, mimeType]
    });
    this.userId = this.auth.userId;
  }

  onSubmit() {
    this.loading = true;
    const thing = new Thing();
    thing.title = this.thingForm.get('title').value;
    thing.description = this.thingForm.get('description').value;
    thing.price = this.thingForm.get('price').value * 100;
    thing.imageUrl = '';
    thing.userId = this.userId;
    this.stuffService.createNewThingWithFile(thing, this.thingForm.get('image').value).then(
      () => {
        this.thingForm.reset();
        this.loading = false;
        this.router.navigate(['/part-four/all-stuff']);
      },
      (error) => {
        this.loading = false;
        this.errorMessage = error.message;
      }
    );
  }

  onImagePick(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.thingForm.get('image').patchValue(file);
    this.thingForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      if (this.thingForm.get('image').valid) {
        this.imagePreview = reader.result as string;
      } else {
        this.imagePreview = null;
      }
    };
    reader.readAsDataURL(file);
  }
}
