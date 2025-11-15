import { Routes } from '@angular/router';
import { Home as HomeComponent } from './home/home';
import { Profile as ProfileComponent } from './profile/profile';
import { Login as LoginComponent} from './login/login';
import { Contact as ContactComponent } from './contact/contact';
import { Register as RegisterComponent } from './register/register';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home Page'
    },
    {
        path: '',
        component: ProfileComponent,
        // title: 'Profile Page'
    },
    {
        path: '',
        component: LoginComponent,
        // title: 'Profile Page'
    },
    {
        path: '',
        component: RegisterComponent,
        // title: 'Profile Page'
    },
    {
        path: '',
        component: ContactComponent,
        // title: 'Profile Page'
    },

];
