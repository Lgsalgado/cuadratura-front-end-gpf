import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthStateService} from "../../services/session/auth-state.service";
import {TokenService} from "../../services/session/token.service";
import {AuthService} from "../../services/session/auth.service";
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errors = null;
  constructor(public router: Router,
              public fb: FormBuilder,
              public authService: AuthStateService,
              private token: TokenService,
              private jwtService: AuthService) {
    this.loginForm = this.fb.group({
      //email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  }
  onSubmit() {
    this.jwtService.login(this.loginForm.value).subscribe(
      (result) => {
        this.responseHandler(result);
      },
      (error) => {
        this.errors = error.error;
        console.log(error);
        Swal.fire(
          'Login rechazado',
          'Usuario y/o contraseña incorrectos',
          'error'
        );
      },
      () => {
        this.authService.setAuthState(true);
        //this.loginForm.reset();
        this.router.navigate(['home']);
      }
    );
  }

  responseHandler(jwt: {
    menu_user: string[];
    access_token: string }) {
    const menu = jwt.menu_user;
    this.authService.setMenu(menu);
    this.token.handleData(jwt.access_token, JSON.stringify(menu));
  }
}
