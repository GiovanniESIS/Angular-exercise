import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from '../users/Persona';
import { Users } from '../users/users';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.html',
  imports: [FormsModule],
  styleUrls: ['./sign-in.css'],
})
export class SignIn {

  nome: string = '';
    email: string = '';
    password: string = '';
  
    utenti: Persona[] = [];
  goToApp() {
    this.router.navigate(['/list_users']);
  }
  constructor(private userService: Users,private router: Router) {
      this.userService.getUtenti().subscribe(u => this.utenti = u);
    }
  private emailValida(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
  aggiungiUtente() {
    if(!this.emailValida(this.email)){
      alert("Email non valida")
      return
    }
    if (this.nome && this.email && this.password) {
      try {
        const nuovoUtente: Persona = {
          nome: this.nome,
          email: this.email,
          password: this.password
        };
        this.userService.creaUtente(nuovoUtente);
        this.goToApp();
        // Reset campi
        this.nome = '';
        this.email = '';
        this.password = '';
      } catch (e: any) {
        alert(e.message);
      }
    } else {
      alert('Compila tutti i campi');
    }
  }
}
