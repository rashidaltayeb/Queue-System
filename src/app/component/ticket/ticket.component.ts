import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PatientService } from '../../services/patient.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['../../../assets/css/ticket.component.css'],
})
export class TicketComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'Name',
    'Service',
    'Ticket',
    'Action',
    'Confirm',
  ];
  dataSource!: MatTableDataSource<any>;
  minDate = new Date();
  dateOfComing!: Date | null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private PatientApi: PatientService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllPatient();
  }
  ///// get all patient
  getAllPatient() {
    this.PatientApi.getPatient().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        this.openErrorsSnackBar('Error while get patient data', 'Close');
      },
    });
  }
  //// start service
  startServices(row: any, id: number) {
    row.service = 2;
    row.ticketNumber = this.generateTicketID();
    this.PatientApi.serviceProgress(row, id).subscribe({
      next: (res) => {
        this.getAllPatient();
        this.openSnackBar('service start successfully', 'OK');
      },
      error: (err) => {
        this.openErrorsSnackBar(
          'cannot start service to this patient',
          'Close'
        );
      },
    });
  }
  //// cancel service
  cancelServices(row: any, id: number) {
    row.service = 1;
    row.ticketNumber = 0;
    row.isComing = 0;
    this.PatientApi.serviceProgress(row, id).subscribe({
      next: (res) => {
        this.getAllPatient();
        this.openSnackBar('service canceled successfully', 'OK');
      },
      error: (err) => {
        this.openErrorsSnackBar(
          'cannot cancel service to this patient',
          'Close'
        );
      },
    });
  }
  //// is Coming
  isComing(row: any, id: number) {
    row.isComing = 1;
    row.service = 3;
    this.PatientApi.serviceProgress(row, id).subscribe({
      next: (res) => {
        this.getAllPatient();
        const queue: any = { patientId: 0 };
        queue.patientId = row.id;
        this.PatientApi.Queue(queue).subscribe({
          next: (res) => {
            this.openSnackBar('confirm success patient on waiting ', 'OK');
          },
        });
      },
      error: (err) => {
        this.openErrorsSnackBar(
          'cannot cancel service to this patient',
          'Close'
        );
      },
    });
  }
  //// not Coming
  notComing(row: any, id: number) {
    row.isComing = 0;
    row.service = 2;
    this.PatientApi.serviceProgress(row, id).subscribe({
      next: (res) => {
        this.getAllPatient();
        this.openSnackBar('confirm canceled successfully', 'OK');
      },
      error: (err) => {
        this.openErrorsSnackBar(
          'cannot cancel service to this patient',
          'Close'
        );
      },
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
  //////
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5 * 1000,
      panelClass: ['color-snackbar'],
    });
  }
  ///////
  openErrorsSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5 * 1000,
      panelClass: ['error-snackbar'],
    });
  }
  //////////
  generateTicketID() {
    try {
      var myDate = new Date();
      var varID: any =
        myDate.getHours() +
        '' +
        myDate.getMinutes() +
        '' +
        myDate.getSeconds() +
        '' +
        myDate.getMilliseconds();
      if (varID.Length > 15) {
        varID = varID.substr(0, 15);
      }
      return varID;
    } catch (err) {
      console.log(err);
    }
  }
}
