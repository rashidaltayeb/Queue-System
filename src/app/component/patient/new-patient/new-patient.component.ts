import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from '../../../services/patient.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: ['../../../../assets/css/new-patient.component.css'],
})
export class NewPatientComponent implements OnInit {
  patientForm!: FormGroup;
  selectedValue: any;
  //
  //
  selectGender: any = [
    { value: 'male', viewValue: 'Male' },
    { value: 'female', viewValue: 'Female' },
  ];
  //
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  ///
  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private PatientApi: PatientService
  ) {}

  ngOnInit(): void {
    this.patientForm = this.formBuilder.group({
      name: ['', Validators.required],
      fullName: ['', Validators.required],
      gender: ['', Validators.required],
      service: [],
      ticketNumber: [],
      isComing: [],
    });
    ///
    this.openSnackBar('Patient Data Has been Added Successfully', 'OK');
  }
  //// create new patient
  addPatient() {
    this.patientForm.value.service = 1;
    this.patientForm.value.ticketNumber = 0;
    this.patientForm.value.isComing = 0;
    if (!this.patientForm.valid)
      return this.openSnackBar('Patient Data is invalid', 'X');
    this.PatientApi.createPatient(this.patientForm.value).subscribe({
      next: (res) => {
        this.patientForm.value == null;
        this.openSnackBar('Patient Data Has been Added Successfully', 'OK');
      },
      error: (err) => {
        return this.openSnackBar('Patient Data is invalid', 'X');
      },
    });
  }
  //// Snack bar
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5 * 1000,
      panelClass: ['color-snackbar'],
    });
  }
}
