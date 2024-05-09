import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import { environment} from "../../../params";

// User interface
export class User {
  name!: String;
  username!: String;
  password!: String;
  password_confirmation!: String;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
    //constante ruta back
    apiUrlLogin= environment.apiUrlLogin;
  // User registration
  register(user: User): Observable<any> {
    return this.http.post('https://fast-wildwood-05309.herokuapp.com/api/auth/register', user);
  }

  // Login
   login(user: User) {
    let clientId = environment.client_id;
    let clienTSecret= environment.client_secret;
    let realmName=environment.realm_name;
    const params = new HttpParams()
      .set('username', user.username.toString()) // Replace with appropriate grant type
      .set('password', user.password.toString())
      .set('client_id', clientId)
      .set('client_secret', clienTSecret)
      .set('realm_name', realmName)
    console.log("paso por aqui>>>"+user.username)
    // Imprimir la solicitud HTTP antes de enviarla
    return this.http.post<any>(this.apiUrlLogin + 'auth/login', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded' // Set content type
      }
    });

   // return this.http.post<any>(this.apiUrl + 'auth/login', user);
  }

  // Access user profile
  profileUser(): Observable<any> {
    return this.http.get('https://fast-wildwood-05309.herokuapp.com/api/auth/user');
  }
  // Access user profile
  profileUserId(id:number): Observable<any> {
    // @ts-ignore
    return this.http.get('https://fast-wildwood-05309.herokuapp.com/api/auth/user/'+id,id);
  }

  // Update user
  updateUser(user: User): Observable<any> {
    return this.http.put('https://fast-wildwood-05309.herokuapp.com/api/auth/user', user);
  }
}
