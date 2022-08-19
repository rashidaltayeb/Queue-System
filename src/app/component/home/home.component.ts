import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../../assets/css/home.component.css'],
})
export class HomeComponent implements OnInit {
  doctorCheck: any;
  patientOnQueueCount: any;
  patientCompleted: any;
  patientOnHoldCount: any;

  constructor(private PatientApi: PatientService) {}

  ngOnInit(): void {
    this.getDoctorStatus();
    this.patientOnQueue();
    this.patientOnCompleted();
    this.patientOnHold();
  }
  ////
  getDoctorStatus() {
    this.PatientApi.getDoctorStatus().subscribe({
      next: (res) => {
        this.doctorCheck = res[0].status;
      },
      error: (err) => {
        return;
      },
    });
  }
  /////
  patientOnQueue() {
    this.PatientApi.patientOnQueue().subscribe({
      next: (res) => {
        this.patientOnQueueCount = res.length;
      },
      error: (err) => {
        return;
      },
    });
  }
  ////
  patientOnCompleted() {
    this.PatientApi.completedPatient().subscribe({
      next: (res) => {
        this.patientCompleted = res.length;
      },
      error: (err) => {
        return;
      },
    });
  }
  /////
  patientOnHold() {
    this.PatientApi.completedPatient().subscribe({
      next: (res) => {
        this.patientOnHoldCount = res.length;
      },
      error: (err) => {
        return;
      },
    });
  }
}
