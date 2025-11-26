import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { Cv as CvComponent } from './cv/cv';
import { Contact as ContactComponent } from './contact/contact';

export const routes: Routes = [
    // Definisikan path untuk Halaman CV
    { 
        path: 'cv', 
        component: CvComponent,
        title: 'Curriculum Vitae'
    },
    // Definisikan path untuk Halaman Kontak
    {
        path: 'contact',
        component: ContactComponent,
        title: 'Contact Saya'
    },
    // Redirect ke /cv jika tidak ada path yang cocok (halaman utama)
    {
        path: '',
        redirectTo: '/cv', 
        pathMatch: 'full' 
    }
    // tambahkan route untuk halaman 404 (opsional)
    // {path:'*', component: NotFoundComponent}
];
