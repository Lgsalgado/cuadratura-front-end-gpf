import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { AppMenuProfileComponent } from './app.menuprofile.component';
import { LayoutService } from './service/app.layout.service';
import {AuthStateService} from "../services/session/auth-state.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-sidebar',
  templateUrl: './app.sidebar.component.html'
})
export class AppSidebarComponent implements OnDestroy {

  timeout: any = null;

  menu: any; // Esta variable almacenará el menú obtenido del servicio de autenticación

  @ViewChild(AppMenuProfileComponent) menuProfile!: AppMenuProfileComponent;

  @ViewChild('menuContainer') menuContainer!: ElementRef;

  private menuSubscription: Subscription | undefined;

  constructor(public layoutService: LayoutService, public el: ElementRef, private authStateService: AuthStateService) {
    // Suscribirse al observable del menú
    this.menuSubscription = this.authStateService.menu$.subscribe(menu => {
      // Almacenar el menú recibido del servicio
      this.menu = menu;
      console.log('Menú:', this.menu);
    });
  }

  resetOverlay() {
    if(this.layoutService.state.overlayMenuActive) {
      this.layoutService.state.overlayMenuActive = false;
    }
  }

  get menuProfilePosition(): string {
    return this.layoutService.config.menuProfilePosition;
  }

  onMouseEnter() {
    if (!this.layoutService.state.anchored) {
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
      this.layoutService.state.sidebarActive = true;
    }
  }

  onMouseLeave() {
    if (!this.layoutService.state.anchored) {
      if (!this.timeout) {
        this.timeout = setTimeout(() => this.layoutService.state.sidebarActive = false, 300);
      }
    }
  }

  anchor() {
    this.layoutService.state.anchored = !this.layoutService.state.anchored;
  }

  ngOnDestroy() {
    // Desuscribirse cuando el componente se destruye para evitar fugas de memoria
    if (this.menuSubscription) {
      this.menuSubscription.unsubscribe();
    }
    this.resetOverlay();
  }
}
