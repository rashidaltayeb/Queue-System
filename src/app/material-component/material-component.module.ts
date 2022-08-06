import { NgModule } from '@angular/core';
//// Angular Material component 
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
///////////////
const materialComponent =[
  MatButtonModule,
  MatIconModule,
  MatDividerModule,
  MatToolbarModule,
  MatListModule,
]
@NgModule({
  imports: [materialComponent],
  exports: [materialComponent]
})
export class MaterialComponentModule {}
