import { Component } from '@angular/core';
import { Users } from '../users/users';
import { Persona } from '../users/Persona';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './list-users.html',
  styleUrls: ['./list-users.css']
})
export class ListUsers {

  nome: string = '';
  email: string = '';
  password: string = '';

  utenti: Persona[] = [];
  utenteSelezionato: Persona | null = null;
  utenteDaCancellare: Persona | null = null;


  azioniUtente: any[] = [];
  dataSelezionata: string = '';

  utenteAttivo: string = '';

  mostra: boolean = false;

  constructor(private userService: Users, private router: Router) {
    this.userService.getUtenti().subscribe(u => this.utenti = u);
    this.utenteAttivo = this.userService.getUtenteAttivo();
  }


  eliminaUtente(email: string) {
    this.userService.eliminaUtente(email);
  }

  chiediConfermaEliminazione(utente: Persona) {
  this.utenteDaCancellare = utente;
}

confermaEliminazione() {
  if (!this.utenteDaCancellare) return;
  localStorage.setItem('utenteAttivo', 'Sconosciuto');
  this.utenteAttivo = 'Sconosciuto';

  this.eliminaUtente(this.utenteDaCancellare.email);
  this.utenteDaCancellare = null;
}

annullaEliminazione() {
  this.utenteDaCancellare = null;
}


  goModify(email: string) {
    this.userService.setSelectedEmail(email);
    this.router.navigate(['/modify-data']);
  }

  selezionaUtente(utente: Persona) {
    this.mostra = false; // disattiva la vista generale
    this.utenteSelezionato = utente;

    const tutte = this.userService.getAzioniGenerali();

    this.azioniUtente = tutte
      .filter(a => a.email === utente.email)
      .map(a => ({
        ...a,
        autore: a.autore || utente.nome
      }));

    this.dataSelezionata = '';
  }

  mostraAzioniGenerali() {
    this.mostra = !this.mostra;

    if (this.mostra) {
      this.utenteSelezionato = {
        nome: 'Tutti',
        email: '',
        password: ''
      } as Persona;

      const tutte = this.userService.getAzioniGenerali();

      this.azioniUtente = tutte.map(a => ({
        ...a,
        autore: a.autore || ''
      }));

      this.dataSelezionata = '';
    } else {
      this.utenteSelezionato = null;
      this.azioniUtente = [];
    }
  }

  get azioniFiltrate() {
    if (!this.dataSelezionata) {
      return this.azioniUtente;
    }

    return this.azioniUtente.filter(
      a => a.date === this.dataSelezionata
    );
  }

  svuotaCronologia() {
    if (!this.utenteSelezionato) return;

    const tutte = this.userService.getAzioniGenerali();

    const nuoveAzioni = tutte.filter(
      a => a.email !== this.utenteSelezionato!.email
    );

    this.userService.setAzioniGenerali(nuoveAzioni);

    this.azioniUtente = [];
    this.dataSelezionata = '';

    localStorage.removeItem('azioni_generali');

    alert('Cronologia svuotata con successo!');
  }

  tornaHome() {
    localStorage.removeItem('utenteAttivo');
    this.router.navigate(['/']);
  }
}
