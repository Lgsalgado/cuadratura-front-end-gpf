import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Verificar si el usuario ha iniciado sesión y tiene un token
    const accessToken = this.tokenService.getToken();
    if (accessToken) {
      // Agregar el token JWT al encabezado "Authorization"
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + accessToken,
        },
      });
    }
    // Pasar la solicitud al siguiente manejador
    return next.handle(req);
  }
}
