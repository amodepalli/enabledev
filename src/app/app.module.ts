import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {ReactiveFormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { MeasurementsComponent } from './measurements/measurements.component';
import { OutputComponent } from './output/output.component';
import { WelcomeComponent } from './welcome/welcome.component'; 
import {AutomeasureComponent} from './automeasure/automeasure.component'
import { routing, appRoutingProviders } from './app.routing';
import {MaterializeModule} from "angular2-materialize";



@NgModule({
  declarations: [
    AppComponent,
    MeasurementsComponent,
    OutputComponent,
    WelcomeComponent,
    AutomeasureComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    MaterializeModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
