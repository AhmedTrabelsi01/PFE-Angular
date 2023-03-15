import { SingleProjectComponent } from './single-project/single-project.component';
import { FinishedProjectComponent } from './mentor/finished-project/finished-project.component';
import { AllProjectsComponent } from './all-projects/all-projects.component';
import { NgModule } from '@angular/core';
import { projectRoutingModule } from './project-routing.module.routing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { AddProjectDjagoraAcadimyComponent } from './mentor/add-project-djagora-acadimy/add-project-djagora-acadimy.component';
import { FormationsComponent } from './formations/formations.component';
import { SingleTrainingComponent } from './single-training/single-training.component';
import { SprintsComponent } from './scrum/sprints/sprints.component';
import { BoardsComponent } from './scrum/boards/boards.component';

@NgModule({
  declarations: [
    AllProjectsComponent,
    FinishedProjectComponent,
    SingleProjectComponent,
    AddProjectDjagoraAcadimyComponent,
    FormationsComponent,
    SingleTrainingComponent,
    SprintsComponent,
    BoardsComponent
  ],
  imports: [
    projectRoutingModule,
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
    ReactiveFormsModule,
    ToastrModule.forRoot(),

  ],
  providers: []
})
export class ProjectModule { }
