import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NewPatientComponent } from './component/patient/new-patient/new-patient.component';
import { PatientComponent } from './component/patient/patient.component';
import { ViewPatientComponent } from './component/patient/view-patient/view-patient.component';
import { TicketComponent } from './component/ticket/ticket.component';
import { WaitingComponent } from './component/waiting/waiting.component';
import { HomeComponent } from './component/home/home.component';

const routes: Routes = [
  {
      path:'',
      component : HomeComponent
  },
  {
    path: 'patient',
    component: PatientComponent,
    children: [
      {
        path: 'view',
        component: ViewPatientComponent,
      },
      {
        path: 'new',
        component: NewPatientComponent,
      },
    ],
  },
  {
    path: 'Queue',
    component: WaitingComponent,
  },
  {
    path: 'service',
    component: TicketComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
