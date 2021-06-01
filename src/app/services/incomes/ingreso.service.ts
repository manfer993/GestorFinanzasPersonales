import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import Income from 'app/models/income.model';

@Injectable({
  providedIn: 'root'
})
export class IngresoService {
  private incomList = new Subject<any>();
  incomList$ = this.incomList.asObservable();

  constructor(private http: HttpClient) { }

  getIncome(accountId: string) {
    const account_id = { 'id_cuenta': accountId }
    return this.http.get('http://localhost:80/rest/src/ingresos.php', { params: account_id });
  }

  createIncome(income: Income) {
    const postIncome = { nombre: income.name, fk_categoria: income.category.id, fecha: income.date, valor: income.value, fk_cuenta: income.account.id }
    return this.http.post('http://localhost:80/rest/src/ingresos.php', postIncome);
  }

  updateIncome(income: Income) {
    const putIncome = { id_ingreso: income.id, nombre: income.name, fk_categoria: income.category.id, fecha: income.date, valor: income.value, fk_cuenta: income.account.id }
    return this.http.put('http://localhost:80/rest/src/ingresos.php', putIncome);
  }

  deleteIncome(incomeId: string) {
    const income_id = { 'id': incomeId }
    return this.http.delete('http://localhost:80/rest/src/ingresos.php', { params: income_id });
  }

  mapIncome(accountId: string) {
    this.getIncome(accountId).subscribe((data: any[]) => {
      this.incomList.next(data.map(item => {
        const income = new Income();
        income.id = item['ID_INGRESO'];
        income.name = item['NOMBRE'];
        income.date = item['FECHA'];
        income.value = parseFloat(item['VALOR']);
        income['fk_cuenta'] = item['FK_CUENTA'];
        income['fk_categoria'] = item['FK_CATEGORIA'];
        return income;
      }));
    });
  }
}
