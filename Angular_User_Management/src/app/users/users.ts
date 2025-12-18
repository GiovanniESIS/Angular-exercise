import { Injectable } from '@angular/core';
import { Persona } from './Persona';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Users {
  private utentiSubject = new BehaviorSubject<Persona[]>(this.caricaUtenti());
  private utenti: Persona[] = this.caricaUtenti();

  private selectedEmail: string | null = null;

  setSelectedEmail(email: string) {
    this.selectedEmail = email;
  }

  getSelectedEmail(): string | null {
    return this.selectedEmail;
  }
  constructor() { }

  public caricaUtenti(): Persona[] {
    const utenti: Persona[] = [];
    let i = 1;
    while (localStorage.getItem(`utente${i}`)) {
      utenti.push(JSON.parse(localStorage.getItem(`utente${i}`)!));
      i++;
    }
    return utenti;
  }

  public getUtenti(): Observable<Persona[]> {
    return this.utentiSubject.asObservable();
  }

  public creaUtente(persona: Persona) {
    const duplicato = this.utenti.some(u => u.email === persona.email);
    if (duplicato) {
      throw new Error('Email già presente');
    }

    let numero = 1;
    while (localStorage.getItem(`utente${numero}`)) {
      numero++;
    }
    localStorage.setItem(`utente${numero}`, JSON.stringify(persona));

    this.utenti.push(persona);
    this.utentiSubject.next(this.utenti);
  }
  public eliminaUtente(email: string) {
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
  
  this.utenti = this.utenti.filter(u => u.email !== email);

  this.utentiSubject.next(this.utenti);
}

  updatePassword(email: string, newPassword: string): boolean {
  let i = 1;
  let trovato = false;

  // aggiorna localStorage
  while (localStorage.getItem(`utente${i}`)) {
    const utente: Persona = JSON.parse(
      localStorage.getItem(`utente${i}`)!
    );

    if (utente.email === email) {
      utente.password = newPassword;
      localStorage.setItem(`utente${i}`, JSON.stringify(utente));
      trovato = true;
      break;
    }
    i++;
  }

  if (!trovato) {
    return false;
  }

  const user = this.utenti.find(u => u.email === email);
  if (user) {
    user.password = newPassword;
  }

  this.utentiSubject.next(this.utenti);

  return true;
}

}
