import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/user/auth.service';

@Component({
  selector: 'app-signup-user',
  templateUrl: './signup-user.component.html',
  styleUrls: ['./signup-user.component.css']
})
export class SignupUserComponent implements OnInit {

  userForm: FormGroup;
  titulo: string = 'Crear cuenta';

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _authService: AuthService,
    private aRouter: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      birthday: ['', Validators.required],
      address: ['', Validators.required],
      workphone: ['', Validators.required],
      mobile: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  addUser() {
    console.log(this.userForm);

      this._authService.register(
        this.userForm.get('username')?.value,
        this.userForm.get('password')?.value,
        this.userForm.get('name')?.value,
        this.userForm.get('lastname')?.value,
        this.userForm.get('email')?.value,
        this.userForm.get('birthday')?.value,
        this.userForm.get('address')?.value,
        this.userForm.get('workphone')?.value,
        this.userForm.get('mobile')?.value,
      ).subscribe(
        data => {
          if(data.success){
            this.isSuccessful = true;
            this.isSignUpFailed = false;
            this.toastr.success(
              'La cuenta se creado con exito'
            );
          }else{
            this.toastr.success(
              data.msg
            );
            this.errorMessage = data.msg;
            this.isSignUpFailed = true;
          }

          this.router.navigate(['signup-user']);
        },
        error => {
          console.log(error);
          this.toastr.success(
            error
          );
          this.userForm.reset();
        }
      );
  }
}
