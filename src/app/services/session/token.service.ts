import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";
import {Observable, of} from "rxjs";
@Injectable({
  providedIn: 'root',
})
export class TokenService {

  private issuer = {
    login: 'https://fast-wildwood-05309.herokuapp.com/api/auth/login',
    register: 'https://fast-wildwood-05309.herokuapp.com/api/auth/register',
  };


  constructor(private router: Router) {}

  handleData(token: string, menu:string) {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('menu',menu)

  }

  getToken() {
    return localStorage.getItem('auth_token');
  }
  getMenu(): Observable<any>{
    const menu = localStorage.getItem('menu');
    return menu ? of(JSON.parse(menu)) : of(null);
  }

  // Verify the token
  isValidToken(): boolean {
    const token = this.getToken();

    // Si no hay token, o si la ruta actual es la de inicio de sesión, retorna true
    if (!token || this.router.url.includes('login')) {
      return false;
    }

    // Intenta decodificar el token y verificar su validez
    const payload = this.payload(token);
    if (payload) {
      return Object.values(this.issuer).indexOf(payload.iss) > -1;
    }

    // Si no se pudo decodificar el payload, retorna false
    return false;
  }

  payload(token: string) {
    const jwtPayload = token.split('.')[1];
    return JSON.parse(atob(jwtPayload));
  }

  // User state based on valid token
  isLoggedIn() {
    return this.isValidToken();
  }

  // Remove token
  removeToken() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('menu');
  }
}
