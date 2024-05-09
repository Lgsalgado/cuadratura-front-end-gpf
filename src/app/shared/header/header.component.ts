import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {AuthStateService} from "../../services/session/auth-state.service";
import {TokenService} from "../../services/session/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  items: MenuItem[] | undefined;

  constructor(
    private auth: AuthStateService,
    public router: Router,
    public token: TokenService,
  ) { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Update',
        icon: 'pi pi-refresh'
      },
      {
        label: 'Delete',
        icon: 'pi pi-times'
      }
    ];
  }
  logOut() {
    this.auth.setAuthState(false);
    this.token.removeToken();
    this.router.navigate(['login']);
  }
}
