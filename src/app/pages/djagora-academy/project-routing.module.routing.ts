import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SingleProjectComponent } from './single-project/single-project.component';
import { AllProjectsComponent } from './all-projects/all-projects.component';
import { FinishedProjectComponent } from './mentor/finished-project/finished-project.component';
import { AddProjectDjagoraAcadimyComponent } from './mentor/add-project-djagora-acadimy/add-project-djagora-acadimy.component';
import { FormationsComponent } from './formations/formations.component';
import { SingleTrainingComponent } from './single-training/single-training.component';
import { SprintsComponent } from './scrum/sprints/sprints.component';
import { BoardsComponent } from './scrum/boards/boards.component';
import { BacklogComponent } from './scrum/backlog/backlog.component';
import { EditSprintComponent } from './scrum/edit-sprint/edit-sprint.component';
import { EditBacklogComponent } from './scrum/backlog/edit-backlog/edit-backlog.component';
const routes: Routes = [
  //project
  { path: '', component: AllProjectsComponent },
  { path: 'SingleProject/:id', component: SingleProjectComponent },
  { path: 'team/:id', component: FinishedProjectComponent },
  { path: 'AddProject', component: AddProjectDjagoraAcadimyComponent },
  { path: 'formations', component: FormationsComponent },
  { path: 'editsprint/:id', component: EditSprintComponent },
  { path: 'sprint/:id', component: SprintsComponent },
  { path: 'boards', component:BoardsComponent },
  { path: 'backlog/:id', component:BacklogComponent },
  { path: 'singletraining/:id', component: SingleTrainingComponent },
  { path: 'editBacklog/:id', component:EditBacklogComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class projectRoutingModule { }
