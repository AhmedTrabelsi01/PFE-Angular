import { NgModule } from '@angular/core';
import { EditProfilComponent } from './edit-profil/edit-profil.component';
import { EditWorkComponent } from './edit-work/edit-work.component';
import { EditHistoryComponent } from './history/edit-history/edit-history.component';
import { EditStartupComponent } from './startup/edit-startup/edit-startup.component';
import { profilRoutingModule } from './profil-routing.module.routing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { ScheduleModule, AgendaService, DayService, WeekService, WorkWeekService, MonthService, DragAndDropService, ResizeService } from '@syncfusion/ej2-angular-schedule';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ToastrModule } from 'ngx-toastr';
import { MyProfilComponent } from './my-profil/my-profil.component';

@NgModule({
  declarations: [
    EditProfilComponent,
    EditWorkComponent,
    EditHistoryComponent,
    EditStartupComponent,
    MyProfilComponent,
  ],
  imports: [
    profilRoutingModule,
    BrowserModule,
    FormsModule,
    Ng2SearchPipeModule,
    HttpClientModule,
    ScheduleModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    MultiSelectModule,
  ],
  providers: []
})
export class ProfilModule { }
