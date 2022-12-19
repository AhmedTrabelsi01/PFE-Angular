import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Authentification/login/login.component';
import { SignupComponent } from './Authentification/signup/signup.component';
import { SignupasmentorComponent } from './Authentification/signup/signupasmentor/signupasmentor.component';
import { SignupasstudentComponent } from './Authentification/signup/signupasstudent/signupasstudent.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { ContactComponent } from './Components/contact/contact.component';
import { HomeComponent } from './Components/home/home.component';
import { AddProjectDjagoraAcadimyComponent } from './Mentor/add-project-djagora-acadimy/add-project-djagora-acadimy.component';
import { ProfilComponent } from './profil/profil.component';
import { EditProfilComponent } from './profil/edit-profil/edit-profil.component';
import { EditWorkComponent } from 'src/app/profil/edit-work/edit-work.component';
import { AddStartupComponent } from './profil/startup/add-startup/add-startup.component';
import { AddHistoryComponent } from './profil/history/add-history/add-history.component';
import { EditHistoryComponent } from './profil/history/edit-history/edit-history.component';
import { EditStartupComponent } from './profil/startup/edit-startup/edit-startup.component';
import { FinishedProjectComponent } from './Public/djagora-academy/finished-project/finished-project.component';
import { ForgotPasswordComponent } from './Authentification/forgot-password/forgot-password.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ApplicationComponent } from './student/application/application.component';
import { SingleProjectComponent } from './Public/djagora-academy/single-project/single-project.component';
import { AllProjectsComponent } from './Public/djagora-academy/all-projects/all-projects.component';
const routes: Routes = [
  //authentification
  { path: 'login', component: LoginComponent},
  { path: 'login/signup', component: SignupComponent},
  { path: 'login/forgot', component: ForgotPasswordComponent},
  { path: 'login/signup/signupmentor', component: SignupasmentorComponent },
  { path: 'login/signup/signupstudent', component: SignupasstudentComponent},
  //public components
  {path: '', component: HomeComponent  },
  { path: 'aboutus', component: AboutUsComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'notfound', component: NotFoundComponent},
  { path: 'djagoraacadimy', component: AllProjectsComponent},
  { path: 'SingleProject/:id', component: SingleProjectComponent},
  { path: 'team/:id', component: FinishedProjectComponent},

  { path: 'profil/:id', component: ProfilComponent},
  { path: 'EditProfil/:id', component: EditProfilComponent},
  { path: 'Editwork/:id', component: EditWorkComponent},
  { path: 'edithistory/:id', component: EditHistoryComponent},
  { path: 'editstartup/:id', component: EditStartupComponent},

  { path: 'addhistory', component: AddHistoryComponent},
  { path: 'addstartup', component: AddStartupComponent},

    //mentor components
    { path: 'AddProject', component: AddProjectDjagoraAcadimyComponent},
  //student components
  { path: 'Postulation/:id', component: ApplicationComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
