import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SingleProjectComponent } from './single-project/single-project.component';
import { AllProjectsComponent } from './all-projects/all-projects.component';
import { FinishedProjectComponent } from './finished-project/finished-project.component';


const routes: Routes = [
  //project
  { path: 'djagoraacadimy', component: AllProjectsComponent },
  { path: 'SingleProject/:id', component: SingleProjectComponent },
  { path: 'team/:id', component: FinishedProjectComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class projectRoutingModule { }
