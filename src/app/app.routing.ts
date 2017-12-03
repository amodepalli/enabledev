import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MeasurementsComponent } from './measurements/measurements.component';
import { OutputComponent } from './output/output.component';
import { WelcomeComponent } from './welcome/welcome.component';
import {AutomeasureComponent} from './automeasure/automeasure.component'

// Route Configuration
export const routes: Routes = [
  { path: '', component: WelcomeComponent},
  { path: 'measurements', component: MeasurementsComponent },
  { path: 'output', component: OutputComponent },
  {path: 'automeasure', component: AutomeasureComponent}
	// { path: '**', component: PageNotFoundComponent }
];
export const appRoutingProviders: any[] = [
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);	