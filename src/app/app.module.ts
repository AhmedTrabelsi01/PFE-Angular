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
import { AddProjectDjagoraAcadimyComponent } from './Mentor/add-project-djagora-acadimy/add-project-djagora-acadimy.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NotFoundComponent } from './not-found/not-found.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ApplicationComponent } from './student/application/application.component';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
//new
import { AuthentificationModule } from './Authentification/Authentification.module';
import { ProfilModule } from './profil/profil.module';
import { ProjectModule } from './Public/djagora-academy/project.module';
@NgModule({
  declarations: [
    AppComponent,
    AboutUsComponent,
    ContactComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AddProjectDjagoraAcadimyComponent,
    NotFoundComponent,
    ApplicationComponent,

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
