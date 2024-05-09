import { NgModule, isDevMode} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
//Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { NopageFoundComponent } from './nopage-found/nopage-found.component';

//Modulos
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgbAlert} from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatTableModule} from "@angular/material/table";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgIconsModule } from '@ng-icons/core';
import { featherAirplay } from '@ng-icons/feather-icons';
import { heroUsers } from '@ng-icons/heroicons/outline';
import {CommonModule} from "@angular/common";
import {CanvasJSAngularChartsModule } from "@canvasjs/angular-charts";
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {AppConfigModule} from "./layout/config/app.config.module";
import {ReactiveFormsModule} from "@angular/forms";
import { PanelModule } from 'primeng/panel';
import {AppLayoutModule} from "./layout/app.layout.module";
import {ToolbarModule} from "primeng/toolbar";


@NgModule({
  declarations: [
    AppComponent,
    NopageFoundComponent,
    LoginComponent,


  ],
    imports: [
      AppLayoutModule,
      PanelModule,
        BrowserModule,
        AppRoutingModule,
        AuthModule,
        PagesModule,
        BrowserAnimationsModule,
        NgbAlert,
        HttpClientModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        BrowserModule,
        RouterModule,
        NgIconsModule.withIcons({featherAirplay, heroUsers}),
        CommonModule,
        CanvasJSAngularChartsModule,
        MatInputModule,
        MatFormFieldModule,
        AppConfigModule,
        ReactiveFormsModule,
      ToolbarModule
    ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
