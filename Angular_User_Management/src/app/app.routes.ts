import { Routes } from '@angular/router';
import { SignIn } from './sign-in/sign-in';
import { ListUsers } from './list-users/list-users';

export const routes: Routes = [
  { path: 'login', component: SignIn },
  { path: 'list_users', component: ListUsers },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];