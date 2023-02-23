import { NgModule } from '@angular/core';
import { ProfilComponent } from './profil.component';
import { EditProfilComponent } from './edit-profil/edit-profil.component';
import { EditWorkComponent } from './edit-work/edit-work.component';
import { EditHistoryComponent } from './history/edit-history/edit-history.component';
import { EditStartupComponent } from './startup/edit-startup/edit-startup.component';
import { profilRoutingModule } from './profil-routing.module.routing';
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
  ],
  providers: []
})
export class ProfilModule { }
