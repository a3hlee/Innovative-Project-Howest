import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  isLoading = false;
  isRegisterSuccess = false;

  registerForm = new FormGroup({
    registerEmail: new FormControl('', [Validators.required]),
    registerPassword: new FormControl('', [Validators.required])
  });

  
  constructor(private auth: AngularFireAuth) {}

  register() {
    this.isLoading = true;
    const email = String(this.registerForm.controls.registerEmail);
    const password = String(this.registerForm.controls.registerPassword);
  
    if (this.registerForm.valid){
      this.auth.createUserWithEmailAndPassword(email.trim(), password)
      .then(() => {
        console.log('Registration successful');
        this.isLoading = false;
        // email.value = '';
        // password.value = '';
        this.isRegisterSuccess = true;
      })
      .catch(error => {
        this.isLoading = false;
        // email.value = '';
        // password.value = '';

        console.error(error);
        if (error.code === 'auth/weak-password') {
          alert('Password should be at least 6 characters.');
        }
        else if (error.code === 'auth/email-already-in-use') {
          alert('The email address is already in use by another account. Please login.');
        }
        else {
          alert(error.message);
        }
      });
    }
  }

  getErrorMessage() {
    if (this.registerForm.controls.registerEmail.hasError('required')) {
      return 'Email is required!';
    }
    else if (this.registerForm.controls.registerPassword.hasError('required')) {
      return 'Password is required!';
    }
    return '';
  }
}
