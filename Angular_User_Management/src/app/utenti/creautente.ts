import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Persona } from './persona';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Lista interna di utenti
  private utenti: Persona[] = [];

  // Subject per notificare eventuali cambiamenti
  private utentiSubject = new BehaviorSubject<Persona[]>(this.utenti);

  constructor() { }

  // Restituisce la lista utenti come Observable
  getUtenti(): Observable<Persona[]> {
    return this.utentiSubject.asObservable();
  }

  // Crea un nuovo utente
  creaUtente(persona: Persona) {
    // Controllo semplice: non permettere email duplicate
    const esiste = this.utenti.some(u => u.email === persona.email);
    if (esiste) {
      throw new Error('Email già presente');
    }

    this.utenti.push(persona);
    this.utentiSubject.next(this.utenti); // Notifica eventuali componenti/subscribers
  }
}
