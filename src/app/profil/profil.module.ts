import { NgModule } from '@angular/core';
import { ProfilComponent } from './profil.component';
import { EditProfilComponent } from './edit-profil/edit-profil.component';
import { EditWorkComponent } from './edit-work/edit-work.component';
import { EditHistoryComponent } from './history/edit-history/edit-history.component';
import { EditStartupComponent } from './startup/edit-startup/edit-startup.component';
import { profilRoutingModule } from './profil-routing.module.routing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [
    ProfilComponent,
    EditProfilComponent,
    EditWorkComponent,
    EditHistoryComponent,
    EditStartupComponent,
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
