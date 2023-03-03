import { MyProfilComponent } from './my-profil/my-profil.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { EditProfilComponent } from './edit-profil/edit-profil.component';
import { EditWorkComponent } from './edit-work/edit-work.component';
import { EditHistoryComponent } from './history/edit-history/edit-history.component';
import { EditStartupComponent } from './startup/edit-startup/edit-startup.component';
import { AddStartupComponent } from './startup/add-startup/add-startup.component';
import { AddHistoryComponent } from './history/add-history/add-history.component';

const routes: Routes = [
  //profil
  { path: 'myProfil/:id', component: MyProfilComponent },
  { path: 'EditProfil/:id', component: EditProfilComponent },
  { path: 'Editwork/:id', component: EditWorkComponent },
  { path: 'edithistory/:id', component: EditHistoryComponent },
  { path: 'editstartup/:id', component: EditStartupComponent },
  { path: 'addhistory', component: AddHistoryComponent },
  { path: 'addstartup', component: AddStartupComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class profilRoutingModule { }
