import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Users } from './users/users';
import { Persona } from './users/Persona';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FormsModule],
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  nome: string = '';
  email: string = '';
  password: string = '';
  utenti: Persona[] = [];
  
  constructor(private userService: Users) {
    this.userService.getUtenti().subscribe(u => this.utenti = u);
  }

  aggiungiUtente() {
    if (this.nome && this.email && this.password) {
      try {
        const nuovoUtente: Persona = {
          nome: this.nome,
          email: this.email,
          password: this.password
        };
        this.userService.creaUtente(nuovoUtente);
 
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
    protected readonly title = signal('Angular_User_Management');
}


