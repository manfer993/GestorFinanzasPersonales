import { Component, OnInit } from '@angular/core';
import Account from 'app/models/account.model';
import { CuentaService } from 'app/services/accounts/cuenta.service';


@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  account: Account;
  user: any;

  constructor() {      
  }

  ngOnInit() {
  }
}
