import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  hide: boolean = true;

  get isLoggedIn(): boolean | undefined {
    return this.authService.isLoggedIn;
  }

  constructor(private authService: AuthService) { }

  login() {
    this.authService.login(this.email, this.password);
    if (this.authService.isLoggedIn) {
      this.email = '';
      this.password = '';
    }
  }
}
