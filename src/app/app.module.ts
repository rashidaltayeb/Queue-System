import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
////  Flex-layout
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialComponentModule } from './material-component/material-component.module';
import { SideNavComponent } from './component/side-nav/side-nav.component';
import { PatientComponent } from './component/patient/patient.component';
import { NewPatientComponent } from './component/patient/new-patient/new-patient.component';
import { ViewPatientComponent } from './component/patient/view-patient/view-patient.component';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    PatientComponent,
    NewPatientComponent,
    ViewPatientComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialComponentModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {} 
