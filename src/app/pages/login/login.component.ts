import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import User from 'app/models/user.model';
import { UsuarioService } from 'app/service/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  user: User;
  constructor(private userService: UsuarioService, private router: Router, private activeRoute: ActivatedRoute) {
    this.user = new User();

  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  loginUser() {
      this.userService.getUser(this.user).subscribe(data => {
      console.log(data)
      if (!!data) {
        sessionStorage.setItem('user',JSON.stringify(data));
        sessionStorage.setItem('token','true');
        this.router.navigate(["/dashboard"]);
      }
    });
  }
}
