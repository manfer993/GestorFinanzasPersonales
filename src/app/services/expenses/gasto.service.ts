import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import Expense from 'app/models/expense.model';

@Injectable({
  providedIn: 'root'
})
export class GastoService {
  private expenseList = new Subject<any>();
  expenseList$ = this.expenseList.asObservable();

  constructor(private http: HttpClient) { }

  getExpense(accountId: string) {
    const account_id = { 'id_cuenta': accountId }
    return this.http.get('http://localhost:80/rest/src/egresos.php', { params: account_id });
  }

  createExpense(expense: Expense) {
    const postExpense = { nombre: expense.name, fk_categoria: expense.category.id, fecha: expense.date, valor: expense.value, fk_cuenta: expense.account.id }
    return this.http.post('http://localhost:80/rest/src/egresos.php', postExpense);
  }

  updateExpense(expense: Expense) {
    const putExpense = { id_egreso: expense.id, nombre: expense.name, fk_categoria: expense.category.id, fecha: expense.date, valor: expense.value, fk_cuenta: expense.account.id }
    return this.http.put('http://localhost:80/rest/src/egresos.php', putExpense);
  }

  deleteExpense(expenseId: string) {
    const expense_id = { 'id': expenseId }
    return this.http.delete('http://localhost:80/rest/src/egresos.php', { params: expense_id });
  }

  mapExpense(accountId: string) {
    this.getExpense(accountId).subscribe((data: any[]) => {
      this.expenseList.next(data.map(item => {
        const expense = new Expense();
        expense.id = item['ID_EGRESO'];
        expense.name = item['NOMBRE'];
        expense.date = item['FECHA'];
        expense.value = parseFloat(item['VALOR']);
        expense['fk_cuenta'] = item['FK_CUENTA'];
        expense['fk_categoria'] = item['FK_CATEGORIA'];
        return expense;
      }));
    });
  }
}
