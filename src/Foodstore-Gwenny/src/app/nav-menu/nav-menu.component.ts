import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  get isLoggedIn(): boolean | undefined {
    return this.authService.isLoggedIn;
  }

  get isAdmin(): boolean | undefined {
    return this.authService.isAdmin;
  }

  constructor(private authService: AuthService) { }

  logout() {
    this.authService.logout();
  }
}
