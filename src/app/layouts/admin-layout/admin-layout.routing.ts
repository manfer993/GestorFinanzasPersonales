import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { AccountComponent } from '../../pages/accounts/account.component';
import { IncomeComponent } from '../../pages/incomes/income.component';
import { ExpenseComponent } from '../../pages/expenses/expense.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'account', component: AccountComponent },
    { path: 'income', component: IncomeComponent },
    { path: 'expense', component: ExpenseComponent }
];
