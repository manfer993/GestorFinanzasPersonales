import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import User from 'app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) {

  }

  getUser(user: User) {
    const loginUser = { user:user.email, pass:user.password }
    return this.http.get('http://localhost:80/rest/src/usuarios.php',{params: loginUser});
  }
}