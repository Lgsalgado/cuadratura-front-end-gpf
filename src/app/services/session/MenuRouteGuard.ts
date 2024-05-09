import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {TokenService} from "./token.service";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MenuRouteGuard implements CanActivate {
  constructor(private authService: TokenService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    // Obtener la ruta solicitada
    const requestedRoute = state.url;

    // Obtener el menú del servicio AuthService y mapearlo
    return this.authService.getMenu().pipe(
      map(menu => {
        const menuArray = Object.keys(menu).map((key: string) => ({
          title: key,
          links: menu[key].map((name: string) => ({
            route: this.getFirstWord(name),
            name: this.getLastWord(name)
          }))
        }));

        // Verificar si la ruta solicitada está presente en el menú mapeado
        const isRouteAllowed = menuArray.some((menuItem) => menuItem.links.some((link: { route: string; }) => link.route === requestedRoute));

        // Permitir siempre acceso a /dashboard
        if (requestedRoute === '/home') {
          return true;
        }

        // Redirigir a una página de error o página de inicio si la ruta no está permitida
        if (!isRouteAllowed) {
          this.router.navigate(['/home']); // Cambia '/error' por la ruta que desees
          return false;
        }

        return true;
      })
    );
  }

  // Método para obtener la primera palabra de la ruta (antes de la coma)
  getFirstWord(str: string): string {
    const lastIndex = str.indexOf(',');
    return str.substring(0, lastIndex);
  }
  getLastWord(str: string): string {
    const lastIndex = str.lastIndexOf(',');
    return str.substring(lastIndex + 1);
  }
}
