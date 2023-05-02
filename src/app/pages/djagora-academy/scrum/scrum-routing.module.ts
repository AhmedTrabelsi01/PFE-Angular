import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditSprintComponent } from './sprints/edit-sprint/edit-sprint.component';
import { BoardsComponent } from './boards/boards.component';
import { EditBacklogComponent } from './backlog/edit-backlog/edit-backlog.component';
import { BacklogComponent } from './backlog/backlog.component';
import { SprintsComponent } from './sprints/sprints.component';


const routes: Routes = [
  { path: 'editsprint/:id', component: EditSprintComponent },
  { path: 'sprint/:id', component: SprintsComponent },
  { path: 'boards/:id', component: BoardsComponent },
  { path: '', component: BacklogComponent },
  { path: 'editBacklog/:id', component: EditBacklogComponent },
]
  ;
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScrumRoutingModule { }
