import { NgModule } from '@angular/core'
import { signupRoutingModule } from './signup-routing.module'
import { SignupasmentorComponent } from './signupasmentor/signupasmentor.component'
import { SignupasstudentComponent } from './signupasstudent/signupasstudent.component'
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component'
@NgModule({
  declarations: [
    SignupasmentorComponent,
    SignupasstudentComponent,
    SignUpComponent,
  ],
  imports: [
    signupRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,
    HttpClientModule,
    ScheduleModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    MultiSelectModule,
    CommonModule,

  ],
  providers: []
})
export class SignupModule { }
