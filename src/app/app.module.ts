import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
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
import { WaitingComponent } from './component/waiting/waiting.component';
import { TicketComponent } from './component/ticket/ticket.component';
import { HomeComponent } from './component/home/home.component';
import { LottieModule } from 'ngx-lottie';

//// import lottie 
import player from 'lottie-web';

// Export this function
export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    PatientComponent,
    NewPatientComponent,
    ViewPatientComponent,
    WaitingComponent,
    TicketComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialComponentModule,
    HttpClientModule,
    CommonModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {} 
