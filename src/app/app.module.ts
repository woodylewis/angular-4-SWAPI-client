import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from "@angular/http";

import { AppComponent } from './app.component';
import { ControlComponent } from './control/control.component';
import { DisplayComponent } from './display/display.component';
import { ApiService } from './core/api.service';
import { DisplayService } from './core/display.service';
import { DataService } from './core/data.service';
import { ErrorService } from './core/error.service';
import { ErrorNameService } from './core/errorName.service';

const appRoutes: Routes = [
  { path: '', component: AppComponent }
];

@NgModule({
  declarations: [
    AppComponent, ControlComponent, DisplayComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes), HttpModule
  ],
  providers: [ ApiService, DataService, DisplayService, 
                ErrorService, ErrorNameService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
