import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Account from 'app/models/account.model';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  constructor(private http: HttpClient) { }

  getAccount(userId: string) {
    const user_id = { 'id_usuario': userId }
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
}
