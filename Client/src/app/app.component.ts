import { Component } from '@angular/core';
import { TokenStorageService } from './services/user/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Client';
  userLogin: string = '';
  roles: string;
  isLoggedIn = false;
  username: string = '';

  constructor(private tokenStorageService: TokenStorageService, private router: Router){}

    ngOnInit(): void {
      this.isLoggedIn = !!this.tokenStorageService.getToken();
      console.log(this.isLoggedIn, 'this.isLoggedIn');
      if (this.isLoggedIn) {
        const { user } = this.tokenStorageService.getUser();
        this.roles = user.role;
        this.username = user.username;
        this.userLogin = user._id;
        console.log(this.username, 'this.username');
      }
    }

    logout(): void {
      this.tokenStorageService.signOut();
      window.location.reload();
    }
}
