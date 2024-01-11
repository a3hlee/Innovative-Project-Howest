import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoading = false;
  isRegisterSuccess = false;

  constructor(private auth: AngularFireAuth, private router: Router) {}

  register() {
    this.isLoading = true;

    const email = document.getElementById('registerEmail') as HTMLInputElement;
    const password = document.getElementById('registerPassword') as HTMLInputElement;
  
    this.auth.createUserWithEmailAndPassword(email.value.trim(), password.value)
      .then(() => {
        this.isLoading = false;
        email.value = '';
        password.value = '';
        this.isRegisterSuccess = true;
      })
      .catch(error => {
        this.isLoading = false;
        email.value = '';
        password.value = '';

        console.error(error);
        if (error.code === 'auth/weak-password') {
          alert('Password should be at least 6 characters.');
        }
        else if (error.code === 'auth/email-already-in-use') {
          alert('This email has already been used. Please login.');
        }
        else if (error.code === 'auth/invalid-email') {
          alert('Email address is required.');
        }
        else {
          alert(error.message);
        }
      });
    }

  login() {
    this.isLoading = true;

    const email = document.getElementById('loginEmail') as HTMLInputElement;
    const password = document.getElementById('loginPassword') as HTMLInputElement;
  
    this.auth.signInWithEmailAndPassword(email.value.trim(), password.value)
      .then(() => {
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