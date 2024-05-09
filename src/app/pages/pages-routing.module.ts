import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {CuadraturaomsComponent} from "./dashboard/cuadraturaoms/cuadraturaoms.component";
import {FacturadorComponent} from "./dashboard/facturador/facturador.component";
import {MenuRouteGuard} from "../services/session/MenuRouteGuard";



const routes:Routes=[
  {path:'dashboard', component:PagesComponent,
    //canActivate:[MenuRouteGuard],
    children:[
      {path:'', component:DashboardComponent},
      {path:'cuadraturaoms', component:CuadraturaomsComponent},
      {path:'facturador', component:FacturadorComponent}
    ]
  },

]

@NgModule({

  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class PagesRoutingModule { }
