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
  styleUrls: ['./waiting.component.css'],
})
export class WaitingComponent implements OnInit {
  displayedColumns: string[] = ['id', 'Name', 'Service', 'Ticket','Finished'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  nextQueue: any = [];
  doctorStatus: any;

  constructor(
    private PatientApi: PatientService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // this.PatientWaiting();
    this.PatientWaiting();
    this.getDoctorStatus()
  }
  ///// get all patient
  PatientWaiting() {
    this.PatientApi.getPatientOnWaiting().subscribe({
      next: (res) => {
        this.nextQueue = res[0];
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        this.openSnackBar('Error while get patient data', 'close');
      },
    });
  }
  /////sent to doctor
  sentToDoctor(id: number) {
    this.PatientApi.sentToDoctor(id).subscribe({
      next: (res) => {
        const status = 1;
        this.PatientApi.doctorStatus(1, status).subscribe({
          next: (res) => {
            this.doctorStatus = res[0].doctorStatus;
            this.openSnackBar('patient now with the doctor', 'OK');
          },
        });
      },
      error: (err) => {
        this.openSnackBar('Error while sent patient to doctor', 'close');
      },
    });
  }
  /////
  getDoctorStatus(){
    this.PatientApi.getDoctorStatus().subscribe({
      next: (res) => {
        this.doctorStatus = res[0].doctorStatus;
        console.log();
      },
      error: (err) => {
        this.openSnackBar('Error while get Doctor Status', 'close');
      },
    });
  }
  /////Finished doctor
  FinishedProgress(id : number){
    /////
    /**
     * 1 - delete ticket 
     * 2 - change doctor status to 0 "not busy"
     * 3 - Edit patient service to 4 "is completed"
     *  **/
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
