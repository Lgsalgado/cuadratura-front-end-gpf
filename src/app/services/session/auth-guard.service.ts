import {inject, Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate, CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
class PermissionsService {

  constructor(private router: Router,private tokenService: TokenService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log("Ingreso canactive"); // (Optional comment: Log for debugging)

    if (this.tokenService.isValidToken()) {
      console.log(this.tokenService.isValidToken()); // (Optional comment: Log for debugging)
      return true;
    } else {
      console.log(this.tokenService.isValidToken()); // (Optional comment: Log for debugging)
      this.router.navigate(['login']);
      return false;
    }
    //your logic goes here
  }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(PermissionsService).canActivate(next, state);
}
/*export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private tokenService: TokenService
  ) {}

  // Function to check if user is authenticated before activating a route
  canActivate(): boolean {
    console.log("Ingreso canactive"); // (Optional comment: Log for debugging)

    if (this.tokenService.isValidToken()) {
      console.log(this.tokenService.isValidToken()); // (Optional comment: Log for debugging)
      return true;
    } else {
      console.log(this.tokenService.isValidToken()); // (Optional comment: Log for debugging)
      this.router.navigate(['login']);
      return false;
    }
  }
}*/
