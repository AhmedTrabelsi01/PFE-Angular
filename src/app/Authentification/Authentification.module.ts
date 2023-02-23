import { signupModule } from './signup/signup.module';
import { NgModule } from '@angular/core'
import { SignupasstudentComponent } from './signup/signupasstudent/signupasstudent.component';
import { SignupasmentorComponent } from './signup/signupasmentor/signupasmentor.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthentificationRoutingModule } from './Authentification-routing.module';
@NgModule({
  declarations: [
    ForgotPasswordComponent,
    LoginComponent,
    SignupComponent,
    SignupasmentorComponent,
    SignupasstudentComponent
  ],
  imports: [
    AuthentificationRoutingModule,
    signupModule
  ],
  providers: []
})
export class AuthentificationModule { }
