import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Dashboards',
                icon: 'pi pi-home',
                items: [
                    {
                        label: 'Sales Dashboard',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/']
                    },
                    {
                        label: 'Analytics Dashboard',
                        icon: 'pi pi-fw pi-chart-pie',
                        routerLink: ['/dashboard-analytics']
                    },
                    {
                        label: 'SaaS Dashboard',
                        icon: 'pi pi-fw pi-bolt',
                        routerLink: ['/dashboard-saas']
                    },
                ]
            },
            {
                label: 'User Management',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'List',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['profile/list']
                    },
                    {
                        label: 'Create',
                        icon: 'pi pi-fw pi-plus',
                        routerLink: ['profile/create']
                    }
                ]
            },
            {
                label: 'Product Managment',
                icon: 'pi pi-fw pi-wallet',
                items: [
                    {
                        label: 'New Product',
                        icon: 'pi pi-fw pi-plus',
                        routerLink: ['ecommerce/new-product']
                    }
                ]
            }

        ];
    }
}
