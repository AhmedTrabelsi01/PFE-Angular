import { SingleProjectComponent } from './single-project/single-project.component';
import { FinishedProjectComponent } from './finished-project/finished-project.component';
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
@NgModule({
  declarations: [
AllProjectsComponent,
FinishedProjectComponent,
SingleProjectComponent
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
