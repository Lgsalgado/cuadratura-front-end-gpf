import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthStateService} from "../../services/session/auth-state.service";
import {Subscription} from "rxjs";
import {TokenService} from "../../services/session/token.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy{
  menu: any[]=[];
  menuArray: { title: string, links: { route: string, name: string }[] }[] = [];
  menuArray1: { title: string, links: { route: string, name: string }[] }[] = [];
  private menuSubscription: Subscription | undefined;
  constructor(private authStateService: AuthStateService,
              private tokenService: TokenService) {
  }

  ngOnInit(): void {
    //const menuUser = this.tokenService.getMenu();
    this.tokenService.getMenu().subscribe(
      (result)=>{
        this.menuArray1 = Object.keys(result).map((title: string) => ({
          title: title,
          links: result[title].map((link: string) => {
            const [route, name] = link.split(','); // Separar la ruta y el nombre
            return { route: route.trim(), name: name.trim() }; // Crear el objeto de enlace
          })
        }));
        console.log("MENU>>"+this.menuArray1)
      }
    ,(error)=>{}
    );


  }
  ngOnDestroy(): void {
    if (this.menuSubscription) {
      this.menuSubscription.unsubscribe();
    }
  }
  getLastWord(str: string): string {
    const lastIndex = str.lastIndexOf(',');
    return str.substring(lastIndex + 1);
  }
  getFirstWord(str: string): string {
    const lastIndex = str.lastIndexOf(',');
    return str.substring(0,lastIndex);
  }
}
