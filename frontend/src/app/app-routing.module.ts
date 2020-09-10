import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartOneComponent } from './part-one/part-one.component';
import { PartThreeComponent } from './part-three/part-three.component';
import { PartFourComponent } from './part-four/part-four.component';
import { DefaultComponent } from './default/default.component';
import { StuffListComponent } from './part-one/stuff-list/stuff-list.component';
import { NewThingComponent } from './part-one/new-thing/new-thing.component';
import { SingleThingComponent } from './part-one/single-thing/single-thing.component';
import { ModifyThingComponent } from './part-one/modify-thing/modify-thing.component';
import { LoginComponent } from './part-three/auth/login/login.component';
import { SignupComponent } from './part-three/auth/signup/signup.component';
import { AuthGuard } from './services/auth-guard.service';
import { NewThingWithUploadComponent } from './part-four/new-thing-with-upload/new-thing-with-upload.component';
import { ModifyThingWithUploadComponent } from './part-four/modify-thing-with-upload/modify-thing-with-upload.component';

const routes: Routes = [
  { path: 'part-one', component: PartOneComponent,
    children: [
      { path: 'new-thing', component: NewThingComponent },
      { path: 'all-stuff', component: StuffListComponent },
      { path: 'thing/:id', component: SingleThingComponent },
      { path: 'modify-thing/:id', component: ModifyThingComponent },
      { path: '', pathMatch: 'full', redirectTo: 'all-stuff' },
      { path: '**', redirectTo: 'all-stuff' }
    ]
  },
  { path: 'part-three', component: PartThreeComponent,
    children: [
      { path: 'new-thing', component: NewThingComponent, canActivate: [AuthGuard] },
      { path: 'all-stuff', component: StuffListComponent, canActivate: [AuthGuard] },
      { path: 'thing/:id', component: SingleThingComponent, canActivate: [AuthGuard] },
      { path: 'modify-thing/:id', component: ModifyThingComponent, canActivate: [AuthGuard] },
      { path: 'auth/login', component: LoginComponent },
      { path: 'auth/signup', component: SignupComponent },
      { path: '', pathMatch: 'full', redirectTo: 'auth/login' },
      { path: '**', redirectTo: 'all-stuff' }
    ]
  },
  { path: 'part-four', component: PartFourComponent,
    children: [
      { path: 'new-thing', component: NewThingWithUploadComponent, canActivate: [AuthGuard] },
      { path: 'all-stuff', component: StuffListComponent, canActivate: [AuthGuard] },
      { path: 'thing/:id', component: SingleThingComponent, canActivate: [AuthGuard] },
      { path: 'modify-thing/:id', component: ModifyThingWithUploadComponent, canActivate: [AuthGuard] },
      { path: 'auth/login', component: LoginComponent },
      { path: 'auth/signup', component: SignupComponent },
      { path: '', pathMatch: 'full', redirectTo: 'auth/login' },
      { path: '**', redirectTo: 'all-stuff' }
    ]
  },
  { path: 'default', component: DefaultComponent },
  { path: '', pathMatch: 'full', component: DefaultComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard
  ]
})
export class AppRoutingModule {}
