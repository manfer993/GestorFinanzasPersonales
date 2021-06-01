import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard', icon: 'nc-bank', class: '' },
    { path: '/account', title: 'Cuentas', icon: 'nc-badge', class: '' },
    { path: '/category', title: 'Categorias', icon: 'nc-shop', class: '' },
    { path: '/income', title: 'Ingresos', icon: 'nc-money-coins', class: '' },
    { path: '/expense', title: 'Gastos', icon: 'nc-credit-card', class: '' }
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
