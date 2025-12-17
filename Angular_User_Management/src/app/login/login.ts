import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Persona } from '../users/Persona';
import { Users } from '../users/users';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
 email: string = '';
  password: string = '';
  err: string = '';
  isError: boolean = false;
  utenti: Persona[] = [];

  constructor(private userService: Users, private router: Router) {
    this.userService.getUtenti().subscribe(u => this.utenti = u);
  }

  login() {
    if (!this.email || !this.password) {
      this.showError('Compila tutti i campi');
      return;
    }

    const utente = this.utenti.find(u => u.email === this.email && u.password === this.password);

    if (utente) {
      this.router.navigate(['/list_users']);
    } else {
      this.showError('Email o password errati');
    }
  }

  private showError(msg: string) {
    this.err = msg;
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
      this.err = '';
    }, 2000);
  }
}
