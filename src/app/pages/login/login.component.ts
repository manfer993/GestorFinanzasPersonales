import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import User from 'app/models/user.model';
import { UsuarioService } from 'app/services/users/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  user: User;
  constructor(
    private userService: UsuarioService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService) {
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
        sessionStorage.setItem('user', JSON.stringify(data));
        sessionStorage.setItem('token', 'true');
        this.router.navigate(["/dashboard"]);
      }else{
        this.showNotification('top','center');
      }

    });
  }
  showNotification(from, align) {
    this.toastr.error(
      '<span data-notify="icon" class="nc-icon nc-alert-circle-i"></span><span data-notify="message">Credenciales Invalidas, Por favor vuelve a intentar</span>',
      "",
      {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-danger alert-with-icon",
        positionClass: "toast-" + from + "-" + align
      }
    );
  }
}
