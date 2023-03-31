import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SingleProjectComponent } from './single-project/single-project.component';
import { AllProjectsComponent } from './all-projects/all-projects.component';
import { FinishedProjectComponent } from './mentor/finished-project/finished-project.component';
import { AddProjectDjagoraAcadimyComponent } from './mentor/add-project-djagora-acadimy/add-project-djagora-acadimy.component';
import { FormationsComponent } from './formations/formations.component';
import { SingleTrainingComponent } from './single-training/single-training.component';
const routes: Routes = [
  //project
  { path: '', component: AllProjectsComponent },
  { path: 'SingleProject/:id', component: SingleProjectComponent },
  { path: 'team/:id', component: FinishedProjectComponent },
  { path: 'AddProject', component: AddProjectDjagoraAcadimyComponent },
  { path: 'formations', component: FormationsComponent },
  { path: 'singletraining/:id', component: SingleTrainingComponent },
  { path: 'backlog/:id', loadChildren: () => import('./scrum/scrum.module').then(m => m.ScrumModule) },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class projectRoutingModule { }
