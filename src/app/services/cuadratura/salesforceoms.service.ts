import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders, HTTP_INTERCEPTORS, HttpParams} from '@angular/common/http';

interface Solicitud {
  name: string;
  address: string;
  phone: string;
  image:any;
  location:string
  open_hour: string;
  close_hour: string;
  services: string;
  facebook: string;
  instagram: string;
  salesforce: any;
  oms: any;
}

@Injectable({
  providedIn: 'root'
})
export class SalesforceomsService {
  baseUrl = 'https://jsonplaceholder.typicode.com/';
  baseUrl2 = 'https://fakestoreapi.com/';
  constructor(private http: HttpClient) { }

  cuadraturaSalesforce(): Observable<any> {
    //const formData: FormData = new FormData();
    //formData.append('salesforce',solicitud.salesforce)
    //formData.append('oms',solicitud.oms)
    //console.log(formData)
    // @ts-ignore
    return this.http.post('http://localhost:8080/api/procesar-archivos');
  }
  listaProductos(): Observable<any> {
    return this.http.get(this.baseUrl2 + 'products/');
  }
  viewRequestviewRequest(id: any): Observable<any> {
    console.log(id);
    return this.http.get(this.baseUrl +`users/${id}`);
  }

}
