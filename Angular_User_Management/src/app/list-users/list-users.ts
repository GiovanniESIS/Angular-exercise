import { Component } from '@angular/core';
import { Users } from '../users/users';
import { Persona } from '../users/Persona';
import { Router} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-list-users',
  imports: [FormsModule,CommonModule],
  templateUrl: './list-users.html',
  styleUrl: './list-users.css',
})
export class ListUsers {
nome: string = '';
  email: string = '';
  password: string = '';

  utenti: Persona[] = [];
  utenteSelezionato: Persona | null = null; azioniUtente: any[] = []; dataSelezionata: string = '';
  constructor(private userService: Users, private router: Router) {
    this.userService.getUtenti().subscribe(u => this.utenti = u);
  }

  
  eliminaUtente(email: string){
    this.userService.eliminaUtente(email)
  }
  goModify(email: string) { this.userService.setSelectedEmail(email); this.router.navigate(['/modify-data']); }
selezionaUtente(utente: Persona) 
{ 
  this.utenteSelezionato = utente;
  const tutte = this.userService.getAzioniGenerali(); 
  this.azioniUtente = tutte.filter(a => a.email === utente.email); 
}
mostraAzioniGenerali() {
   this.utenteSelezionato = { nome: "Tutti", email: "", password: "" } as Persona; 
   this.azioniUtente = this.userService.getAzioniGenerali(); 
   this.dataSelezionata = ""; 
  }
 get azioniFiltrate()
 { 
    if (!this.dataSelezionata) return this.azioniUtente; 
  return this.azioniUtente.filter(a => a.date === this.dataSelezionata); } 
  tornaHome() { this.router.navigate(['/']); 

  }
}