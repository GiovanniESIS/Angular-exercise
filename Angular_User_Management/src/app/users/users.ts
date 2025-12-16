import { Injectable } from '@angular/core';
import { Persona } from './Persona';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'  // rende il servizio disponibile globalmente
})
export class Users {
  private utentiSubject = new BehaviorSubject<Persona[]>(this.caricaUtenti());
  private utenti: Persona[] = this.caricaUtenti();

  constructor() { }

  // Recupera tutti gli utenti dal localStorage
  public caricaUtenti(): Persona[] {
    const utenti: Persona[] = [];
    let i = 1;
    while (localStorage.getItem(`utente${i}`)) {
      utenti.push(JSON.parse(localStorage.getItem(`utente${i}`)!));
      i++;
    }
    return utenti;
  }

  // Restituisce l'observable per aggiornare la lista
  public getUtenti(): Observable<Persona[]> {
    return this.utentiSubject.asObservable();
  }

  // Crea un nuovo utente e lo salva con chiave utente1, utente2...
  public creaUtente(persona: Persona) {
    // Controllo duplicati
    const duplicato = this.utenti.some(u => u.email === persona.email);
    if (duplicato) {
      throw new Error('Email già presente');
    }

    // Trova il prossimo numero disponibile
    let numero = 1;
    while (localStorage.getItem(`utente${numero}`)) {
      numero++;
    }

    // Salva singolarmente nel localStorage
    localStorage.setItem(`utente${numero}`, JSON.stringify(persona));

    // Aggiorna array interno e notifica subscribers
    this.utenti.push(persona);
    this.utentiSubject.next(this.utenti);
  }
  public eliminaUtente(email: string) {
  // Rimuove dal localStorage
  let i = 1;
  while (localStorage.getItem(`utente${i}`)) {
   const utente: Persona = JSON.parse(
      localStorage.getItem(`utente${i}`)!
    );
    console.log(utente.email + email)

    if (utente.email == email) {
      localStorage.removeItem(`utente${i}`);
      break;
    }
    i++;
  }
  
  // Aggiorna array interno
  this.utenti = this.utenti.filter(u => u.email !== email);

  // Notifica i componenti
  this.utentiSubject.next(this.utenti);
}

}
