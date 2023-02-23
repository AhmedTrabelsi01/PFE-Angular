import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SignupasmentorComponent } from './signupasmentor/signupasmentor.component';
import { SignupasstudentComponent } from './signupasstudent/signupasstudent.component';
import { SignupComponent } from './signup.component';

const routes: Routes = [
  //signup
  { path: 'login/signup/signupmentor', component: SignupasmentorComponent },
  { path: 'login/signup/signupstudent', component: SignupasstudentComponent },
  { path: 'login/signup', component: SignupComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class signupRoutingModule { }
