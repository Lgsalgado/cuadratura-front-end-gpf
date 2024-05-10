import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders, HTTP_INTERCEPTORS, HttpParams} from '@angular/common/http';
import { TokenService} from "../session/token.service";
import {Orden} from "../../pages/dashboard/facturador/facturador.component";



const rango={
  "status": "",
  "startDate": "01/11/2023",
  "endDate": "01/11/2023",
  "store": 4,
  "ordenCompra": "",
  "typeOrder": ""
}
const login={
  "user": "lgsalgados",
  "password": "Zarita2013",
  "cadena": "4"
}
export class User {
  user!: String;
  password!: String;
  cadena!: String;
}

@Injectable({
  providedIn: 'root'
})
export class FacturadorService {
  constructor(private http: HttpClient,private tokenService: TokenService) {}
  // @ts-ignore
  token:string= this.tokenService.getToken()
  headers = new HttpHeaders()
    .set('8f2c4087cd5d9ba126c6be31a3dcf575','' )

  //Apis
  facturadorReinject: string = 'https://c89bbin9ae.execute-api.us-east-1.amazonaws.com/prod/order/reinject'
  private api ='http://localhost:8080/api/'
  private facturador:string ='https://facturadorbackend.socoomni.com:8080/MTDServices/'

  sesion(): Observable<any> {
    return this.http.get(this.api+"loginFacturador");
  }


  empujar(numeroOrden: string, idEvent: number) {
    const requestBody = {
      numeroOrden: numeroOrden,
      idEvent: idEvent
    };
    // @ts-ignore
    return this.http.post(this.api+"reinject",requestBody);
  }
  searchIdEvent(numeroOrden: string){
    const headers = { 'Content-Type': 'application/json' };
    // @ts-ignore
    return this.http.post(this.api+'search', numeroOrden, { headers: headers });
  }
  searchOrdersError(fechaInicio: string, fechaFin: string): Observable<any>{
    const requestBody = {
      startDate: fechaInicio,
      endDate: fechaFin
    };
    return this.http.post(this.api+'searchOrdersError',requestBody)
  }
}
