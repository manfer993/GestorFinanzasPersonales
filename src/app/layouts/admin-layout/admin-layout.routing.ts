import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { AccountComponent } from '../../pages/accounts/account.component';
import { CategoryComponent } from '../../pages/categories/category.component';
import { IncomeComponent } from '../../pages/incomes/income.component';
import { ExpenseComponent } from '../../pages/expenses/expense.component';
import { CanActivateViaAuthGuard } from 'app/services/guard';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [CanActivateViaAuthGuard] },
    { path: 'account', component: AccountComponent, canActivate: [CanActivateViaAuthGuard] },
    { path: 'category', component: CategoryComponent, canActivate: [CanActivateViaAuthGuard] },
    { path: 'income', component: IncomeComponent, canActivate: [CanActivateViaAuthGuard] },
    { path: 'expense', component: ExpenseComponent, canActivate: [CanActivateViaAuthGuard] }
];
