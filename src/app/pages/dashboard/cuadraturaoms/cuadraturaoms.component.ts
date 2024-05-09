import {Component, Input, OnInit} from '@angular/core';
import {DatePipe, NgFor} from "@angular/common";
import {NgbAlertConfig,NgbAlertModule,NgbDateStruct, NgbCalendar, NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';
import { JsonPipe } from '@angular/common';
import {SalesforceomsService} from "../../../services/cuadratura/salesforceoms.service";
import {MatTableModule} from "@angular/material/table";
import {NgIconComponent} from "@ng-icons/core";
import {provideIcons } from '@ng-icons/core';
import { featherAirplay } from '@ng-icons/feather-icons';
import { heroUsers,heroWifi } from '@ng-icons/heroicons/outline';
import { Router } from '@angular/router';
import Swal from "sweetalert2";
import {CommonModule} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {isInteger} from "@ng-bootstrap/ng-bootstrap/util/util";

export interface Solicitud {
  id: number;
  username: string;
  name: string;
  email: string;
}
@Component({
  selector: 'app-cuadraturaoms',
  standalone: true,
  templateUrl: './cuadraturaoms.component.html',
  imports: [NgFor, NgbAlertModule,
    NgbDatepickerModule,
    FormsModule,
    JsonPipe,
    DatePipe,
    MatTableModule,
    NgIconComponent,
    CommonModule, MatFormFieldModule],
  styleUrls: ['./cuadraturaoms.component.scss'],
  providers: [NgbAlertConfig],
  viewProviders: [provideIcons({ featherAirplay, heroUsers,heroWifi})]
})
export class CuadraturaomsComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'actionsColumn'
  ];
  miNumero: number =0;
  solicitudForm: FormGroup;
  solicitud: Solicitud[] = [];
  dataSource: any;
  aux:any;
  model: NgbDateStruct | undefined;
  date: { year: number; month: number; } | undefined;
  err: any;

  @Input() public alerts: Array<string> = [];

  constructor(
    alertConfig: NgbAlertConfig,
    public router: Router,
    private calendar: NgbCalendar,
    private salesforceService: SalesforceomsService,
    private fb: FormBuilder) {
    this.solicitudForm = this.fb.group({
      salesforce: ['', [Validators.required]],
      oms: ['', [Validators.required]],
    });
    alertConfig.type = 'success';
    alertConfig.dismissible = false;
  }
  ngOnInit(): void {
    this.model = this.calendar.getToday();
    //console.log(this.model.year)
  }




  //Realizar cuadratura Salesforce Oms
  cuadraturaSalesforceOMS(): void {
      this.salesforceService.cuadraturaSalesforce().subscribe(
        (data) => {
          data.map((data: any) => {
            this.solicitud.push(data);
            this.dataSource = this.solicitud;
          });
        },
        (error) => {
          this.err = error;
          Swal.fire({
            title: 'Error!',
            text: this.err.message+" status: "+this.err.status,
            icon: 'error',
            confirmButtonText: 'Aceptar'
          })

        },
        () => {
          this.router.navigate([`dashboard/cuadraturaoms/`]);
        }
      );
    }
  onFileSelect(e: any) {
    console.log('test');
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      this.solicitudForm.controls['salesforce'].setValue(file);
    }else {
      Swal.fire(
        'No existe archivo adjunto'
      )
    }
  }
  onFileSelect1(e: any) {
    console.log('test');
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      this.solicitudForm.controls['oms'].setValue(file);
    }else {
      Swal.fire(
        'No existe archivo adjunto'
      )
    }
  }


}


