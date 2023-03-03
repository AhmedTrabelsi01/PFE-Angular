import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SignupasmentorComponent } from './signupasmentor/signupasmentor.component';
import { SignupasstudentComponent } from './signupasstudent/signupasstudent.component';
import { SignUpComponent } from './sign-up/sign-up.component'

const routes: Routes = [
  //signup
  { path: 'signupmentor', component: SignupasmentorComponent },
  { path: 'signupstudent', component: SignupasstudentComponent },
  { path: '', component: SignUpComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class signupRoutingModule { }
