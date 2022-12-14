import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//// Angular Material component
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { HttpClientModule } from '@angular/common/http';
///////////////
const materialComponent = [
  MatButtonModule,
  MatIconModule,
  MatDividerModule,
  MatToolbarModule,
  MatListModule,
  MatTableModule,
  MatFormFieldModule,
  MatRadioModule,
  MatPaginatorModule,
  HttpClientModule,
  FormsModule,
  ReactiveFormsModule,
  MatInputModule,
  MatSnackBarModule,
  MatCheckboxModule,
  MatCardModule,
  MatProgressBarModule,
  MatDatepickerModule,
  MatMomentDateModule,
  MatSelectModule,
];
@NgModule({
  imports: [materialComponent],
  exports: [materialComponent],
})
export class MaterialComponentModule {}
