import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  userForm: FormGroup;
  titulo: string = 'Crear Usuario';
  id: string | null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _userService: UserService,
    private aRouter: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      birthday: ['', Validators.required],
      address: ['', Validators.required],
      workphone: ['', Validators.required],
      mobile: ['', Validators.required],
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  addUser() {
    console.log(this.userForm);

    const User: User = {
      username: this.userForm.get('username')?.value,
      password: this.userForm.get('password')?.value,
      role: this.userForm.get('role')?.value,
      name: this.userForm.get('name')?.value,
      lastname: this.userForm.get('lastname')?.value,
      email: this.userForm.get('email')?.value,
      birthday: this.userForm.get('birthday')?.value,
      address: this.userForm.get('address')?.value,
      workphone: this.userForm.get('workphone')?.value,
      mobile: this.userForm.get('mobile')?.value,
    };

    if (this.id !== null) {
      //editar ruta
      this._userService.editUser(this.id, User).subscribe(
        (data) => {
          this.toastr.success(
            'El usuario fue actualizado con éxito',
            '¡Usuario Actualizado!'
          );
          this.router.navigate(['/list-user']);
        },
        (error) => {
          console.log(error);
          this.userForm.reset();
        }
      );
    } else {
      //agregar ruta
      console.log(User);
      this._userService.saveUser(User).subscribe(
        (data) => {
          this.toastr.success(
            'El usuario fue registrado con éxito',
            '¡Usuario Registrado!'
          );
          this.router.navigate(['/list-user']);
        },
        (error) => {
          console.log(error);
          this.userForm.reset();
        }
      );
    }
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Usuario';
      this._userService.getUser(this.id).subscribe((data) => {
        this.userForm.setValue({
          username: data.username,
          password: data.password,
          role: data.role,
          name: data.name,
          lastname: data.lastname,
          email: data.email,
          birthday: data.birthday,
          address: data.address,
          workphone: data.workphone,
          mobile: data.mobile,
        });
      });
    }
  }
}
