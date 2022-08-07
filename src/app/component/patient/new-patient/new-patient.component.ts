import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.css'],
})
export class NewPatientComponent implements OnInit {
  patientForm!: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.patientForm = this.formBuilder.group({
      patientName: ['', Validators.required],
      patientFullName: ['', Validators.required],
      patientEmail: ['', Validators.required],
    });
  }
}
