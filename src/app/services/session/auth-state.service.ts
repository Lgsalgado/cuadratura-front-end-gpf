import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { TokenService } from './token.service';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private userState = new BehaviorSubject<boolean>(this.token.isLoggedIn());
  userAuthState = this.userState.asObservable();
  private menuSubject = new BehaviorSubject<any>(null);
  menu$ = this.menuSubject.asObservable();
  constructor(public token: TokenService) {}

  setAuthState(value: boolean) {
    this.userState.next(value);
  }
  setMenu(menu: any) {
    this.menuSubject.next(menu);
  }

  getMenu(): Observable<any> {
    return this.menu$;
  }
}
