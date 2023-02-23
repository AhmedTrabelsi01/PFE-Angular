import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  //authentification
  { path: 'login', component: LoginComponent },
  { path: 'login/forgot', component: ForgotPasswordComponent },
  //signup
  {
    path: "signup",
    loadChildren: () =>
      import("./signup/signup.module").then((m) => m.signupModule),

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthentificationRoutingModule { }
