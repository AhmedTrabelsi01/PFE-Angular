import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { ContactComponent } from './Components/contact/contact.component';
import { HomeComponent } from './Components/home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
const routes: Routes = [
  //public components
  { path: '', component: HomeComponent },
  { path: 'aboutus', component: AboutUsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'notfound', component: NotFoundComponent },
  //authentification
  {
    path: "Authentification",
    loadChildren: () =>
      import("./Authentification/Authentification.module").then((m) => m.AuthentificationModule),
  },
  //profils
  {
    path: "Profils",
    loadChildren: () =>
      import("./profil/profil.module").then((m) => m.ProfilModule),
  },
  //project
  {
    path: "djagoraacadimy",
    loadChildren: () =>
      import("./pages/djagora-academy/project.module").then((m) => m.ProjectModule),
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
