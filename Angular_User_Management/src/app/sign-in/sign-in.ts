import { Component, ChangeDetectorRef  } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Persona } from '../users/Persona';
import { Users } from '../users/users';
import { FormsModule } from '@angular/forms';
import { timeout } from 'rxjs';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.html',
  imports: [FormsModule,RouterLink],
  styleUrls: ['./sign-in.css'],
})
export class SignIn {

  nome: string = '';
    email: string = '';
    password: string = '';
    err: string = '';
    isError = false;
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
  goToApp() {
    this.router.navigate(['/list_users']);
  }
  constructor(private userService: Users,private router: Router,private cd: ChangeDetectorRef) {
      this.userService.getUtenti().subscribe(u => this.utenti = u);
    }
  private emailValida(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
  aggiungiUtente() {
  // Controllo campi vuoti
  if (!this.nome || !this.email || !this.password) {
    this.showError("Compila tutti i campi");
    return;
  }

  // Controllo email
  if (!this.emailValida(this.email)) {
    this.showError("Email errata");
    return;
  }

  // Aggiungi utente
  try {
    const nuovoUtente: Persona = {
      nome: this.nome,
      email: this.email,
      password: this.password
    };
    this.userService.creaUtente(nuovoUtente);
    this.goToApp();
    this.nome = '';
    this.email = '';
    this.password = '';
  } catch (e: any) {
    alert(e.message);
  }
}


  private showError(msg: string) {
  this.cd.detectChanges();
  this.err = msg;
  this.isError = true;
  setTimeout(() => {
    this.isError = false;
    this.err = '';
    this.cd.detectChanges();
  }, 2000);
}
}
