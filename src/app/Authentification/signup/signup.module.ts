import { NgModule } from '@angular/core'
import { signupRoutingModule } from './signup-routing.module'
import { SignupComponent } from './signup.component'
import { SignupasmentorComponent } from './signupasmentor/signupasmentor.component'
import { SignupasstudentComponent } from './signupasstudent/signupasstudent.component'
@NgModule({
  declarations: [
    SignupasmentorComponent,
    SignupasstudentComponent,
    SignupComponent,
  ],
  imports: [
    signupRoutingModule,
  ],
  providers: []
})
export class signupModule { }
