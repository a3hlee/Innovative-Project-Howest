import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { User } from '../services/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoading = false;

  constructor(private auth: AngularFireAuth, private router: Router) {}

  login() {
    this.isLoading = true;

    const email = document.getElementById('loginEmail') as HTMLInputElement;
    const password = document.getElementById('loginPassword') as HTMLInputElement;
  
    this.auth.signInWithEmailAndPassword(email.value.trim(), password.value)
      .then(() => {
        console.log('login successful');

        this.isLoading = false;

        email.value = '';
        password.value = '';

        this.router.navigate(['/']);
      })
      .catch(error => {
        this.isLoading = false;

        email.value = '';
        password.value = '';

        console.error(error);
        alert(error.message);
      });
    }
}
