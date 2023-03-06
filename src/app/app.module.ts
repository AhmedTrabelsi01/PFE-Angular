import { SignupModule } from './Authentification/signup/signup.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { ContactComponent } from './Components/contact/contact.component';
import { HomeComponent } from './Components/home/home.component';
import { HeaderComponent } from './Layouts/header/header.component';
import { FooterComponent } from './Layouts/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NotFoundComponent } from './not-found/not-found.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ScheduleModule, AgendaService, DayService, WeekService, WorkWeekService, MonthService, DragAndDropService, ResizeService } from '@syncfusion/ej2-angular-schedule';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { AuthentificationModule } from './Authentification/Authentification.module';
import { ProfilModule } from './profil/profil.module';
import { ProjectModule } from './pages/djagora-academy/project.module';
@NgModule({
  declarations: [
    AppComponent,
    AboutUsComponent,
    ContactComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,
    HttpClientModule,
    ScheduleModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    MultiSelectModule,
    AuthentificationModule,
    ProfilModule,
    ProjectModule,
    SignupModule,


  ],
  providers: [AgendaService, DayService, WeekService, WorkWeekService, MonthService, DragAndDropService, ResizeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
