import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  email: string = '';
  password: string = '';

  get isLoggedIn(): boolean | undefined {
    return this.authService.isLoggedIn;
  }

  constructor(private authService: AuthService) { }

  logout() {
    this.authService.logout();

    // Clear input fields
    this.email = '';
    this.password = '';
  }
}
