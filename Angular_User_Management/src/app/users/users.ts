import { Component } from '@angular/core';
import { Persona } from './Persona';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'  // rende il servizio disponibile globalmente
})

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {
  utenti: Persona[] = [
  { nome: 'Giovanni', email: 'gbuono814@gmail.com', password: '*****' },
  { nome: 'Luigi', email: 'luigi@example.com', password: '*****' }];

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
