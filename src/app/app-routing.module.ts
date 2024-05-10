import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NopageFoundComponent } from './nopage-found/nopage-found.component';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { PagesRoutingModule } from './pages/pages-routing.module';
import {CuadraturaomsComponent} from "./pages/dashboard/cuadraturaoms/cuadraturaoms.component";
import {PagesComponent} from "./pages/pages.component";
import {LoginComponent} from "./auth/login/login.component";
import {AppLayoutComponent} from "./layout/app.layout.component";
import {AuthGuard} from "./services/session/auth-guard.service";
import {FacturadorComponent} from "./pages/dashboard/facturador/facturador.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";


const routes:Routes=[

  {path:'', redirectTo:'login', pathMatch:'full'},
  {path: 'login', component: LoginComponent},
  {path:'**', component:NopageFoundComponent},
  {
    path: '',
    component:AppLayoutComponent,
    canActivate:[AuthGuard],
    children:[
      {
        path:'dashboard/facturador', component:FacturadorComponent
      }
    ]

  }
]

@NgModule({

  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
