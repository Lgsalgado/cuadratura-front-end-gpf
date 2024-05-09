import {Component, inject, Input, OnInit} from '@angular/core';
import {CommonModule, DatePipe, JsonPipe, NgFor} from "@angular/common";
import {
  NgbAlertConfig,
  NgbAlertModule,
  NgbCalendar,
  NgbDate,
  NgbDatepickerModule,
  NgbDateStruct
} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';

import {FacturadorService} from "../../../services/facturador/facturador.service";
import {MatTableModule} from "@angular/material/table";
import {NgIconComponent, provideIcons} from "@ng-icons/core";
import {featherAirplay} from '@ng-icons/feather-icons';
import {heroUsers, heroWifi} from '@ng-icons/heroicons/outline';
import {Router} from '@angular/router';
import Swal from "sweetalert2";
import {TokenService} from "../../../services/session/token.service";
import {MatInputModule} from "@angular/material/input";
import {SalesforceomsService} from "../../../services/cuadratura/salesforceoms.service";
import {concatMap, delay, interval, Observable, take} from "rxjs";
import {HttpClient} from '@angular/common/http';

export interface Solicitud {
  id: number;
  username: string;
  name: string;
  email: string;
}
export interface Orden{
  orden: string;
  idEvent: number;
}
@Component({
  selector: 'app-facturador',
  standalone: true,
  templateUrl: './facturador.component.html',
  styleUrls: ['./facturador.component.scss'],
  imports: [NgFor, NgbAlertModule,
    NgbDatepickerModule,
    FormsModule,
    JsonPipe,
    DatePipe,
    MatTableModule,
    NgIconComponent,
    CommonModule, MatInputModule],
  providers: [NgbAlertConfig],
  viewProviders: [provideIcons({ featherAirplay, heroUsers,heroWifi}),
  ],
})

export class FacturadorComponent implements OnInit{
  displayedColumns: string[] = [
    'id',
    'user',
    'name',
    'email',
    'actionsColumn'
  ];
  solicitudForm: FormGroup;
  solicitud: Solicitud[] = [];
  dataSource: any;
  aux:any;
  model: NgbDateStruct | undefined;
  date: { year: number; month: number; } | undefined;
  err: any;
  ordenInput: string = ''
  mostrarBotonVerificarOrden: boolean = true;
  ordenReinject: Orden={
    orden:"",idEvent:0
  }
  calendar = inject(NgbCalendar);
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate = this.calendar.getToday();
  toDate: NgbDate | null = this.calendar.getNext(this.fromDate, 'd', 10);

  @Input() public alerts: Array<string> = [];
  public ordenes: Array<Orden> = [
    {orden:"F00437791" ,idEvent:8697465},
    {orden:"F00437853" ,idEvent:8690446},
    {orden:"F00437858" ,idEvent:8691956},
    {orden:"F00437944" ,idEvent:8690531},
    {orden:"F00437973" ,idEvent:8693750},
    {orden:"F00438013" ,idEvent:8693804},
    {orden:"F00438018" ,idEvent:8694693},
    {orden:"F00438050" ,idEvent:8696516},
    {orden:"F00438055" ,idEvent:8696557},
    {orden:"F00438093" ,idEvent:8693746},
    {orden:"F00438159" ,idEvent:8696560},
    {orden:"F00438180" ,idEvent:8697369},
    {orden:"F00438182" ,idEvent:8697280},
    {orden:"F00438233" ,idEvent:8699475},
    {orden:"F00438291" ,idEvent:8698355},
    {orden:"F00438330" ,idEvent:8699657},
    {orden:"F00438349" ,idEvent:8700603},
    {orden:"F00438407" ,idEvent:8703447},
    {orden:"F00438413" ,idEvent:8702804},
    {orden:"F00438423" ,idEvent:8703605},
    {orden:"F00438434" ,idEvent:8704822},
    {orden:"F00438445" ,idEvent:8704585},
    {orden:"F00438498" ,idEvent:8703596},
    {orden:"F00438501" ,idEvent:8703590},
    {orden:"F00438517" ,idEvent:8704837},
    {orden:"F00438539" ,idEvent:8706493},
    {orden:"F00438542" ,idEvent:8705706},
    {orden:"F00438555" ,idEvent:8706220},
    {orden:"F00438557" ,idEvent:8705709},
    {orden:"F00438570" ,idEvent:8706165},
    {orden:"F00438583" ,idEvent:8705775},
    {orden:"F00438589" ,idEvent:8705904},
    {orden:"F00438594" ,idEvent:8706222},
    {orden:"F00438597" ,idEvent:8708722},
    {orden:"F00438620" ,idEvent:8706518},
    {orden:"F00438673" ,idEvent:8706183},
    {orden:"F00438676" ,idEvent:8706463},
    {orden:"F00438677" ,idEvent:8705913},
    {orden:"F00438679" ,idEvent:8708689},
    {orden:"F00438741" ,idEvent:8707838},
    {orden:"F00438785" ,idEvent:8708685},
    {orden:"F00438932" ,idEvent:8709917},
    {orden:"F00438962" ,idEvent:8710583},
    {orden:"F00439050" ,idEvent:8713306},
    {orden:"F00439114" ,idEvent:8711673},
    {orden:"F00439132" ,idEvent:8712609},
    {orden:"F00439170" ,idEvent:8716489},
    {orden:"F00439196" ,idEvent:8716394},
    {orden:"F00439199" ,idEvent:8716112},
    {orden:"F00439200" ,idEvent:8716552},
    {orden:"F00439278" ,idEvent:8716560},
    {orden:"F00439285" ,idEvent:8717590},
    {orden:"FCC10032589" ,idEvent:8689912},
    {orden:"FCC10033092" ,idEvent:8690914},
    {orden:"FCC10033865" ,idEvent:8691420},
    {orden:"FCC10033972" ,idEvent:8690103},
    {orden:"FCC10034641" ,idEvent:8690896},
    {orden:"FCC10034643" ,idEvent:8690909},
    {orden:"FCC10034835" ,idEvent:8697337},
    {orden:"FCC10035007" ,idEvent:8705779},
    {orden:"FCC10035017" ,idEvent:8705346},
    {orden:"FCC10035039" ,idEvent:8705707},
    {orden:"FCC10035042" ,idEvent:8706164},
    {orden:"FCC10035044" ,idEvent:8705219},
    {orden:"FCC10035045" ,idEvent:8705214},
    {orden:"FCC10035046" ,idEvent:8706218},
    {orden:"FCC10035052" ,idEvent:8705907},
    {orden:"FCC10035062" ,idEvent:8705897},
    {orden:"FCC10035066" ,idEvent:8705895},
    {orden:"FCC10035070" ,idEvent:8705843},
    {orden:"FCC10035073" ,idEvent:8706202},
    {orden:"FCC10035078" ,idEvent:8706191},
    {orden:"FCC10035329" ,idEvent:8711571},
    {orden:"FCC10035360" ,idEvent:8713299},
    {orden:"FCC10035367" ,idEvent:8713303},
    {orden:"FCC10035491" ,idEvent:8715987},
    {orden:"FCC10035517" ,idEvent:8716106},
    {orden:"FCC10035518" ,idEvent:8716344},
    {orden:"FCC10035524" ,idEvent:8716335},
    {orden:"FCC10035526" ,idEvent:8716423},
    {orden:"FCC10035535" ,idEvent:8716415},
    {orden:"FCC10035538" ,idEvent:8716505},
    {orden:"FCC10035539" ,idEvent:8716536},
    {orden:"FCC10035540" ,idEvent:8716545}
    ];

  constructor(
    alertConfig: NgbAlertConfig,
    public router: Router,
    //private calendar: NgbCalendar,
    private facturadorService: FacturadorService,
    private salesforceService : SalesforceomsService,
    private token: TokenService,
    private httpClient: HttpClient,
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
  }//covierte el input en mayusculas
    convertirAMayusculas(event: any) {
        this.ordenInput = event.toUpperCase();
    }
    //buscar Ordenes con error
  obtenerOrdenesError(fechaInicio: NgbDate, fechaFin: NgbDate | null): void {
    console.log(this.concatenarFecha(fechaInicio)+" >> "+this.concatenarFecha(fechaFin))

    this.facturadorService.searchOrdersError(this.concatenarFecha(fechaInicio), this.concatenarFecha(fechaFin)).subscribe(
      (datos) => {
        // Maneja los datos obtenidos según sea necesario
      },
      (error) => {
        // Maneja los errores de la solicitud HTTP
      }
    );
  }
  concatenarFecha(fecha: NgbDate | null):string{
    return (fecha?.day + "/" + fecha?.month + "/" + fecha?.year);
  }

  //Enviar con pausa
  enviarListaConPausa(): void {
    interval(3500)  // Pausa de 1 segundo (1000 milisegundos)
      .pipe(
        take(this.ordenes.length),  // Tomar tantos elementos como la longitud de la lista
        concatMap(index => this.enviarOrden(index))
      )
      .subscribe(
        () => console.log('Orden enviada exitosamente'),
        error => console.error('Error al enviar orden:', error),
        () => console.log('Envío de órdenes completado')
      );
  }


  private enviarOrden(index: number): Observable<any> {
    if(index==-1){
      return this.facturadorService.empujar(this.ordenReinject.orden, this.ordenReinject.idEvent)
        .pipe(
          delay(1000)  // Opcional: Pausa adicional de medio segundo (500 milisegundos)
        );
    }else{
      const ordenActual = this.ordenes[index];
      //const url = 'https://c89bbin9ae.execute-api.us-east-1.amazonaws.com/prod/order/reinject';

      return this.facturadorService.empujar(ordenActual.orden, ordenActual.idEvent)
        .pipe(
          delay(500)  // Opcional: Pausa adicional de medio segundo (500 milisegundos)
        );
    }
  }
  empujarOrden(): void {
    interval(1000)  // Pausa de 1 segundo (1000 milisegundos)
      .pipe(
        take(this.ordenes.length),  // Tomar tantos elementos como la longitud de la lista
        concatMap(index => this.enviarOrden(-1))
      )
      .subscribe(
        (response=>{
          console.log(response)
            Swal.fire({
                title: 'Orden: '+this.ordenReinject.orden,
                text: " La orden fue empujada "+response.message ,
                icon: 'success',
                confirmButtonText: 'Aceptar'
            })
        }),
        error => console.error('Error al enviar orden:', error),
        () => console.log('Envío de órden completado')
      );
  }


  //función para verificar orden
  // @ts-ignore
  buscarOrden(): Observable<any> {
    console.log(this.ordenInput)
     this.facturadorService.searchIdEvent(this.ordenInput).subscribe(response => {
       this.ordenReinject.idEvent= Number(response)
       this.ordenReinject.orden= this.ordenInput
       //empujar orden
       this.empujarOrden()
       // Oculta el botón después de presionarlo
       this.ordenInput="";
     }, error => {
       console.error('Error en la solicitud:', error);
       Swal.fire({
         title: 'Error!',
         text: " status: "+error.error.error+" -> "+ error.status ,
         icon: 'error',
         confirmButtonText: 'Aceptar'
       })
       // Manejar el error según sea necesario
     });
  }

  //ordenes
  setOrdenes():void{
    for (let orden of this.ordenes){
      setTimeout(()=>{
        console.log("es la orden "+ orden.orden)
        this.prueba(orden.orden,orden.idEvent)
      },1000)
    }

  }
prueba(orden: string, idEvent:number):void{
      this.facturadorService.empujar(orden,idEvent).subscribe(
        (data) => {
         console.log(data)
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
          //this.router.navigate([`dashboard/facturador/`]);
        }
      )
}






  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

}
