import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/user/auth.service';
import { TokenStorageService } from 'src/app/services/user/token-storage.service';

@Component({
  selector: 'app-signin-user',
  templateUrl: './signin-user.component.html',
  styleUrls: ['./signin-user.component.css']
})
export class SigninUserComponent implements OnInit {

  userForm: FormGroup;

  titulo: string = 'Iniciar Sesión';
  isLoggedIn: boolean =  false;
  isLoginFailed: boolean =  false;
  errorMessage: string =  '';
  roles: string [] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _authService: AuthService,
    private aRouter: ActivatedRoute,
    private tokenStorage: TokenStorageService
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  signInUser() {
    console.log(this.userForm);

    this._authService.login(this.userForm.get('username')?.value, this.userForm.get('password')?.value).subscribe(
      data => {
        console.log(data);
        if (data.success === true) {
          data.roles = data.user.role;
          this.tokenStorage.saveToken(data.token);
          this.tokenStorage.saveUser(data);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getUser().roles;
          window.location.reload();
        } else{
          this.toastr.warning(
            data.msg
          );
          this.errorMessage = data.msg;
          this.isLoginFailed = true;
        }
      },
      error => {
        this.toastr.error(
          "Usuario incorrecto"
        );
        this.errorMessage = error.msg;
        this.isLoginFailed = true;
        console.log(error);
        this.userForm.reset();
      }
    );

  }

  reloadPage(): void {
    window.location.reload();
  }
}
