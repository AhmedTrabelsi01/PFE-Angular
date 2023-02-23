import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { ContactComponent } from './Components/contact/contact.component';
import { HomeComponent } from './Components/home/home.component';
import { AddProjectDjagoraAcadimyComponent } from './Mentor/add-project-djagora-acadimy/add-project-djagora-acadimy.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ApplicationComponent } from './student/application/application.component';

const routes: Routes = [

  //authentification
  {
    path: "Authentification",
    loadChildren: () =>
      import("./Authentification/Authentification.module").then((m) => m.AuthentificationModule),
  },


  //profils
  {
    path: "Profil/:id",
    loadChildren: () =>
      import("./profil/profil.module").then((m) => m.ProfilModule),
  },


  //project
  {
    path: "djagoraacadimy",
    loadChildren: () =>
      import("./Public/djagora-academy/project.module").then((m) => m.ProjectModule),
  },
  //public components
  { path: '', component: HomeComponent },
  { path: 'aboutus', component: AboutUsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'notfound', component: NotFoundComponent },

  //mentor components
  { path: 'AddProject', component: AddProjectDjagoraAcadimyComponent },
  //student components
  { path: 'Postulation/:id', component: ApplicationComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
