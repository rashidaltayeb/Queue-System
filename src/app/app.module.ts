import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
////  Flex-layout
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialComponentModule } from './material-component/material-component.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialComponentModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
