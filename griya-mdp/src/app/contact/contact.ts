import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule,Validator , ValidationErrors, FormBuilder, Form, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  contactForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder){
    this.contactForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['',[Validators.required, Validators.email]],
      phone: ['',[Validators.required, Validators.pattern(/^08[0-9]{8,12}$/)]],
      subject: ['',[Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      newslatter: [false]
    });
    }

    submitContact(): void{
      if(this.contactForm.valid){
        const FormContact = this.contactForm.value;
        console.log('Form Submitted', FormContact)

        // Simulasi sukses
        this.successMessage = 'Pesan Anda berhasil dikirim! Kami akan menghubungi Anda segera';
        this.errorMessage = '';

        // Riset Form setelah submit
        this.contactForm.reset();

        setTimeout(() => {
          this.successMessage = '';
        }, 500);
        
      }else{
        console.log('Form is not valid');
        this.errorMessage = 'Mohon lengkapi semua field dengan benar.';
        this.successMessage = '';
      }
  }
  resetForm(): void{
    this.contactForm.reset();
    this.successMessage = '';
    this.errorMessage = '';
  }
}
