import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  email: string = '';
  password: string = '';
  hide: boolean = true;

  get isLoggedIn(): boolean | undefined {
    return this.authService.isLoggedIn;
  }

  constructor(private authService: AuthService) { }

  signUp() {
    this.authService.signUp(this.email, this.password);

    // Clear input fields
    this.email = '';
    this.password = '';
  }
}
