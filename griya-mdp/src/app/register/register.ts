
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registerForm: FormGroup; // `registerForm` bertipe `FormGroup` untuk mengelola seluruh form


  // `fb: FormBuilder` di-inject melalui constructor untuk membuat form
  constructor(private fb: FormBuilder){
    // `fb.group()` - Membuat FormGroup dengan object configuration
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  submitRegister(): void{
    if(this.registerForm.valid){
      const formData = this.registerForm.value;
      console.log('Form submitted', formData);

      // TODO: Kirim data ke backend API
      // this.authService.register(formData).subscribe(...)
    } else {
      console.log('Form is not valid')
    }

    
  } 
}

