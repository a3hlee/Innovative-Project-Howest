import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent {
  email: string = '';

  constructor(private authService: AuthService) { }
  
  resetPassword() {
    this.authService.resetPassword(this.email);
  }
}
