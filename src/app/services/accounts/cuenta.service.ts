import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Account from 'app/models/account.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {
  private accountList = new Subject<any>();
  accountList$ = this.accountList.asObservable();
  
  constructor(private http: HttpClient) {
  }

  getAccount(userId: string) {
    const user_id = { 'id_usuario': userId }
    return this.http.get('http://localhost:80/rest/src/cuentas.php', { params: user_id });
  }
  getAccountById(accountid: string) {
    const user_id = { 'id_usuario': accountid }
    return this.http.get('http://localhost:80/rest/src/cuentas.php', { params: user_id });
  }
  createAccount(account: Account) {
    const postAccount = { nombre: account.name, fk_usuario: account.user_id }
    return this.http.post('http://localhost:80/rest/src/cuentas.php', postAccount);
  }
  updateAccount(account: Account) {
    const putAccount = { id_cuenta: account.id, nombre: account.name, fk_usuario: account.user_id }
    return this.http.put('http://localhost:80/rest/src/cuentas.php', putAccount);
  }
  deleteAccount(accountId: string) {
    const account_id = { 'id': accountId }
    return this.http.delete('http://localhost:80/rest/src/cuentas.php', { params: account_id });
  }

  mapAccount(userId: string) {
    this.getAccount(userId).subscribe((data: any[]) => {
      this.accountList.next(data.map(item => {
        const account = new Account();
        account.id = item['ID_CUENTA'];
        account.name = item['NOMBRE'];
        account.user_id = item['FK_USUARIO'];
        return account;
      }));
    });
  }
}
