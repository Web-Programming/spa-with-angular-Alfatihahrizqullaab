import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// - `ReactiveFormsModule` - Untuk menggunakan Reactive Forms
// - `FormGroup` - Tipe data untuk mengelola grup form control
// - `Validators` - Built-in validators Angular (required, email, minLength)
// - `FormBuilder` - Service untuk membuat form dengan syntax yang lebih ringkas
import { FormGroup, ReactiveFormsModule, ValidationErrors, FormBuilder, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router'; // tambah router untuk navigasi ke home page setelah berhasil
import { AuthService } from '../services/auth.service'; // service untuk API Calss dan localStorage managemnt



@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;
  showPassword = false;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    // Form initialization
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  submitLogin(): void{
    if(this.loginForm.valid){
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const formData = this.loginForm.value;

      // Kirim data ke backend API melalui AuthService
      this.authService.login(formData).subscribe({
        next: (response) => {
          console.log('Login succesfull', response);
          this.successMessage = response.message || 'Login berhasil';

          // Simpan user data ke localStroge
          if(response.data){
            this.authService.saveUserData(response.data);
          }

          // Redirect ke home page setelah 1 detik
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 1000);
        },
        error: (error) => {
            console.error('Login failed', error);
            this.isLoading = false;
            this.errorMessage = error.error?.message || 'Email atau password salah';
            
            // Auto hide error message after 5 seconds
            setTimeout(() => {
              this.errorMessage = '';
            }, 5000);
        }
      })

      // TODO: Kirim data ke backend API untuk autentikasi
      // this.authService.login(formData).subscribe(...)
    }else{
      console.log('Form is not valid');
      this.errorMessage = 'Mohon lengkapi semua field dengan benar';
    }
  }
}   

