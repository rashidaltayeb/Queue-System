import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl,FormGroup } from '@angular/forms';
import { PatientService } from '../../services/patient.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.component.html',
  styleUrls: ['../../../assets/css/waiting.component.css'],
})
export class WaitingComponent implements OnInit {
  displayedColumns: string[] = ['Name', 'Ticket', 'Finished'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  patientUpdate: any;
  updateService: any;
  nextQueue: any = [];
  allTicket: any = [];
  patientOnProgress: any = [];
  doctorStatus: any;
  doctorCheck: any;

  constructor(
    private PatientApi: PatientService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getDoctorStatus();
    this.queueControl();
  }
  ///// get all patient
  getPatientWithID(id: number) {
    this.PatientApi.getPatientWithID(id).subscribe({
      next: (res) => {
        this.patientUpdate = res[0];
        this.dataSource = new MatTableDataSource(res);
      },
      error: (err) => {
        this.openSnackBar('Error while get patient data', 'close');
      },
    });
  }
  /////sent to doctor
  sentToDoctor(id: number) {
    ///
    this.patientUpdate.service = 4;
    this.PatientApi.serviceProgress(
      this.updateService,
      this.patientUpdate.id
    ).subscribe({
      next: (res) => {
        this.doctorStatus.status = 1;
        this.PatientApi.doctorStatus(1, this.doctorStatus).subscribe({
          next: (res) => {
            this.getDoctorStatus();
            this.openSnackBar('patient now with the doctor', 'OK');
          },
          error: (err) => {
            this.openSnackBar('can`t change doctor status', 'close');
          },
        });
        this.PatientOn();
      },
      error: (err) => {
        this.openSnackBar('Error while sent patient to doctor', 'close');
      },
    });
  }
  /////
  getDoctorStatus() {
    this.PatientApi.getDoctorStatus().subscribe({
      next: (res) => {
        this.doctorStatus = res[0];
        this.doctorCheck = this.doctorStatus.status;
      },
      error: (err) => {
        this.openSnackBar('Error while get Doctor Status', 'close');
      },
    });
  }
  ////// control in the queue
  queueControl() {
    this.PatientApi.getAllTicket().subscribe({
      next: (res) => {
        this.allTicket = '';
        this.allTicket = res;
        this.PatientOn();
        this.getPatientWithID(this.allTicket[0].patientId);
      },
      error: (err) => {
        this.openSnackBar('Error while get patient data', 'close');
      },
    });
  }
  /////
  removeTicket(row: any, id: number) {
    this.updateService = row;
    this.PatientApi.removeTicket(id).subscribe({
      next: (res) => {
        this.PatientApi.getAllTicket().subscribe({
          next: (res) => {
            this.allTicket = res;
            this.sentToDoctor(this.allTicket[0].patientId);
            this.queueControl();
            this.getPatientWithID(this.allTicket[0].patientId);
          },
        });
        this.openSnackBar('successfully sent to the doctor', 'ok');
      },
    });
  }
  ////get patient on services
  PatientOn() {
    this.PatientApi.getPatientOnService().subscribe({
      next: (res) => {
        if (res.length != 1) {
          this.patientOnProgress = [];
          return;
        }
        this.patientOnProgress = res[0];
      },
    });
  }
  /////
  patientOut() {
    this.patientOnProgress.service = 5;
    this.PatientApi.serviceProgress(
      this.patientOnProgress,
      this.patientOnProgress.id
    ).subscribe({
      next: (res) => {
        this.doctorStatus.status = 0;
        this.PatientApi.doctorStatus(1, this.doctorStatus).subscribe({
          next: (res) => {
            this.getDoctorStatus();
            this.openSnackBar('patient finished successfully', 'OK');
          },
          error: (err) => {
            this.openSnackBar('can`t change doctor status', 'close');
          },
        });
        this.PatientOn();
      },
      error: (err) => {
        this.openSnackBar('Error while sent patient to doctor', 'close');
      },
    });
  }
  /////
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  ////
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
