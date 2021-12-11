import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  users: User[];
  constructor(private _userService: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this._userService.getUsers()
    .subscribe({
      next: (data) => {
        this.users = data;
        console.log(data);
      },
      error: (e: any) => console.error(e)
    });
  }

  deleteUser(id:any){
    this._userService.deleteUser(id).subscribe(data => {
      this.toastr.error('El usuario fue eliminado con éxito', 'Usuario Eliminado');
      this.getUsers();
    }, error => {
      console.log(error);
    })
  }

}
