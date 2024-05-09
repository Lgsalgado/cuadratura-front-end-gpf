import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import {CanvasJSAngularChartsModule} from "@canvasjs/angular-charts";
import { FacturadorComponent } from './dashboard/facturador/facturador.component';
import {MatTableModule} from "@angular/material/table";
import {NgIconComponent} from "@ng-icons/core";
import {NgbAlert, NgbDatepicker} from "@ng-bootstrap/ng-bootstrap";



@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    CanvasJSAngularChartsModule,
    MatTableModule,
    NgIconComponent,
    NgbAlert,
    NgbDatepicker
  ],
  exports: [
    DashboardComponent,
  ]
})
export class PagesModule { }
