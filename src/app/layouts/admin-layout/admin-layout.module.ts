import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { AccountComponent } from '../../pages/accounts/account.component';
import { IncomeComponent } from '../../pages/incomes/income.component';
import { ExpenseComponent } from '../../pages/expenses/expense.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule
  ],
  declarations: [
    DashboardComponent,
    AccountComponent,
    IncomeComponent,
    ExpenseComponent
  ]
})

export class AdminLayoutModule { }
