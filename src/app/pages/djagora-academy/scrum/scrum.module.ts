import { EditSprintComponent } from './sprints/edit-sprint/edit-sprint.component';
import { BoardsComponent } from './boards/boards.component';
import { EditBacklogComponent } from './backlog/edit-backlog/edit-backlog.component';
import { BacklogComponent } from './backlog/backlog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SprintsComponent } from './sprints/sprints.component';
import { ScrumRoutingModule } from './scrum-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ToastrModule } from 'ngx-toastr';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EvaluationComponent } from './sprints/evaluation/evaluation.component';


@NgModule({
  declarations: [
    BacklogComponent,
    EditBacklogComponent,
    BoardsComponent,
    EditSprintComponent,
    SprintsComponent,
    EvaluationComponent,

  ],
  imports: [
    CommonModule,
    ScrumRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,
    HttpClientModule,
    ScheduleModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    MultiSelectModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    DragDropModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    MatDialogModule
  ]
})
export class ScrumModule { }
