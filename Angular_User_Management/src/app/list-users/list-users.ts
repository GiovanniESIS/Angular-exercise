import { Component } from '@angular/core';
import { Users } from '../users/users';
import { Persona } from '../users/Persona';
import { Router} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-users',
  standalone : true,
  imports: [FormsModule,CommonModule],
  templateUrl: './list-users.html',
  styleUrls: ['./list-users.css'],

})
export class ListUsers {
nome: string = '';
  email: string = '';
  password: string = '';
  utenti: Persona[] = [];
  utenteSelezionato: Persona | null = null;
   azioniUtente: any[] = []; 
   dataSelezionata: string = '';
   utenteAttivo: string = '';

  constructor(private userService: Users, private router: Router) {
    this.userService.getUtenti().subscribe(u => this.utenti = u);
    this.utenteAttivo = this.userService.getUtenteAttivo();
  }

  
  eliminaUtente(email: string){
    this.userService.eliminaUtente(email)
  }
  goModify(email: string) { this.userService.setSelectedEmail(email); this.router.navigate(['/modify-data']); }
selezionaUtente(utente: Persona) 
{ 
  this.utenteSelezionato = utente;
  const tutte = this.userService.getAzioniGenerali(); 
  this.azioniUtente = tutte
  .filter(a => a.email === utente.email)
  .map(a => ({
    ...a,
    autore: a.autore || utente.nome   
  }));

}
mostraAzioniGenerali() {
   this.utenteSelezionato = { nome: "Tutti", email: "", password: "" } as Persona; 
   const tutte = this.userService.getAzioniGenerali();

this.azioniUtente = tutte.map(a => ({
  ...a,
  autore: a.autore || ''  
}));

   this.dataSelezionata = ""; 
  }
 get azioniFiltrate()
 { 
    if (!this.dataSelezionata) return this.azioniUtente; 
  return this.azioniUtente.filter(a => a.date === this.dataSelezionata); } 
  svuotaCronologia() {
  if (!this.utenteSelezionato) return;

  // Recupera tutte le azioni
  const tutte = this.userService.getAzioniGenerali();

  // Filtra via quelle dell’utente selezionato
  const nuoveAzioni = tutte.filter(a => a.email !== this.utenteSelezionato!.email);

  // Salva nel servizio
  this.userService.setAzioniGenerali(nuoveAzioni);

  // Aggiorna la vista
  this.azioniUtente = [];
  this.dataSelezionata = "";
  localStorage.removeItem('azioni_generali')

  alert("Cronologia svuotata con successo!");
}

  tornaHome() { this.router.navigate(['/']); 

  }
}