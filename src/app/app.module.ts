import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Authentification/login/login.component';
import { SignupComponent } from './Authentification/signup/signup.component';
import { SignupasmentorComponent } from './Authentification/signup/signupasmentor/signupasmentor.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { SignupasstudentComponent } from './Authentification/signup/signupasstudent/signupasstudent.component';
import { ContactComponent } from './Components/contact/contact.component';
import { HomeComponent } from './Components/home/home.component';
import { HeaderComponent } from './Layouts/header/header.component';
import { FooterComponent } from './Layouts/footer/footer.component';
import { AddProjectDjagoraAcadimyComponent } from './Mentor/add-project-djagora-acadimy/add-project-djagora-acadimy.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfilComponent } from './profil/profil.component';
import { EditProfilComponent } from './profil/edit-profil/edit-profil.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { EditWorkComponent } from 'src/app/profil/edit-work/edit-work.component';
import { AddHistoryComponent } from './profil/history/add-history/add-history.component';
import { EditHistoryComponent } from './profil/history/edit-history/edit-history.component';
import { AddStartupComponent } from './profil/startup/add-startup/add-startup.component';
import { EditStartupComponent } from './profil/startup/edit-startup/edit-startup.component';
import { FinishedProjectComponent } from './Public/djagora-academy/finished-project/finished-project.component';
import { ForgotPasswordComponent } from './Authentification/forgot-password/forgot-password.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ApplicationComponent } from './student/application/application.component';
import { SingleProjectComponent } from './Public/djagora-academy/single-project/single-project.component';
import { AllProjectsComponent } from './Public/djagora-academy/all-projects/all-projects.component';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
//new
import { AuthentificationModule } from './Authentification/Authentification.module';
import { ProfilModule } from './profil/profil.module';
import { ProjectModule } from './Public/djagora-academy/project.module';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    SignupasmentorComponent,
    AboutUsComponent,
    SignupasstudentComponent,
    ContactComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AddProjectDjagoraAcadimyComponent,
    ProfilComponent,
    EditProfilComponent,
    EditWorkComponent,
    AddHistoryComponent,
    EditHistoryComponent,
    AddStartupComponent,
    EditStartupComponent,
    FinishedProjectComponent,
    ForgotPasswordComponent,
    NotFoundComponent,
    ApplicationComponent,
    SingleProjectComponent,
    AllProjectsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,
    HttpClientModule,
    ScheduleModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    MultiSelectModule,
    AuthentificationModule,
    ProfilModule,
    ProjectModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
