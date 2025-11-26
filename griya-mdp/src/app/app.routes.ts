    import { Routes } from '@angular/router';
    import { Home as HomeComponent } from './home/home';
    import { Profile as ProfileComponent } from './profile/profile';
    import { Login as LoginComponent} from './login/login';
    import { Contact as ContactComponent } from './contact/contact';
    import { Register as RegisterComponent } from './register/register';
    import { Detail } from './detail/detail';

    export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home',
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'property/:id',
    component: Detail,
    title: 'Detail Property',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

