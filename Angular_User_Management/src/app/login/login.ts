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
  admin = {
    email: 'admin',
    password: 'admin'
  }
 email: string = '';
  password: string = '';
  err: string = '';
  isError: boolean = false;
  utenti: Persona[] = [];
  showPassword: boolean = false;
  nome_check: string = "Mostra password";
  togglePassword() {
    this.showPassword = !this.showPassword;
    if (this.showPassword) {
      this.nome_check = "Nascondi password";
    } else {
      this.nome_check = "Mostra password";
    }
  }

  constructor(private userService: Users, private router: Router) {
    this.userService.getUtenti().subscribe(u => this.utenti = u);
  }

  login() {
    if(this.email === this.admin.email && this.password === this.admin.password) {
      this.userService.setUtenteAttivo('Admin');
      this.router.navigate(['/list_users']);
      return;
    }
    if (!this.email || !this.password) {
      this.showError('Compila tutti i campi');
      return;
    }
    
    const utente = this.utenti.find(u => u.email === this.email && u.password === this.password);

    if (utente) {
        this.userService.setUtenteAttivo(utente.nome);

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
