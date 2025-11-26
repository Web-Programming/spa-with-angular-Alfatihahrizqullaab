import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// - `ReactiveFormsModule` - Untuk menggunakan Reactive Forms
// - `FormGroup` - Tipe data untuk mengelola grup form control
// - `Validators` - Built-in validators Angular (required, email, minLength)
// - `FormBuilder` - Service untuk membuat form dengan syntax yang lebih ringkas
import { FormGroup, ReactiveFormsModule, ValidationErrors, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Form initialization
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  submitLogin(): void{
    if(this.loginForm.valid){
      const formData = this.loginForm.value;
      console.log('Login Submitted', formData);

      // TODO: Kirim data ke backend API untuk autentikasi
      // this.authService.login(formData).subscribe(...)
    }else{
      console.log('Form is not valid')
    }
  }
}   

