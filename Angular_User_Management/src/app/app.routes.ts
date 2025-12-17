import { Routes } from '@angular/router';
import { SignIn } from './sign-in/sign-in';
import { ListUsers } from './list-users/list-users';
import { Login } from './login/login';
import { Home } from './home/home';

export const routes: Routes = [
  { path: 'home', component: Home},
  { path: 'login', component: Login},
  { path: 'sign-in', component: SignIn },
  { path: 'list_users', component: ListUsers },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];