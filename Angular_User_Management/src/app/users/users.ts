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
  private utenteAttivo: string = '';

  constructor() {
    this.utenteAttivo = localStorage.getItem('utenteAttivo') || '';
  }

 
  setUtenteAttivo(nome: string) {
    this.utenteAttivo = nome;
    localStorage.setItem('utenteAttivo', nome);
  }

  getUtenteAttivo(): string {
    if (!this.utenteAttivo) {
      this.utenteAttivo = localStorage.getItem('utenteAttivo') || '';
    }
    return this.utenteAttivo;
  }


  setSelectedEmail(email: string) {
    this.selectedEmail = email;
  }

  getSelectedEmail(): string | null {
    return this.selectedEmail;
  }


  getAzioniGenerali(): any[] {
    return JSON.parse(localStorage.getItem('azioni_generali') || '[]');
  }

  setAzioniGenerali(azioni: any[]) {
    localStorage.setItem('azioni_generali', JSON.stringify(azioni));
  }

  private salvaAzioneGenerale(azione: any) {
    const lista = this.getAzioniGenerali();
    azione.autore = this.utenteAttivo || '';
    lista.push(azione);
    this.setAzioniGenerali(lista);
  }

 
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

    this.salvaAzioneGenerale({
      email: persona.email,
      nome: persona.nome,
      title: "ha creato un utente",
      date: new Date().toISOString().slice(0, 10)
    });
  }


  public eliminaUtente(email: string) {
    let i = 1;
    let nome = '';

    while (localStorage.getItem(`utente${i}`)) {
      const utente: Persona = JSON.parse(localStorage.getItem(`utente${i}`)!);

      if (utente.email === email) {
        nome = utente.nome;
        localStorage.removeItem(`utente${i}`);
        break;
      }
      i++;
    }

    this.utenti = this.utenti.filter(u => u.email !== email);
    this.utentiSubject.next(this.utenti);

    this.salvaAzioneGenerale({
      email: email,
      nome: nome || email,
      title: "ha eliminato un utente",
      date: new Date().toISOString().slice(0, 10)
    });
  }

 
 
  updatePassword(email: string, old_password: string, newPassword: string): boolean {
    let i = 1;

    while (localStorage.getItem(`utente${i}`)) {
      const utente: Persona = JSON.parse(localStorage.getItem(`utente${i}`)!);

      if (utente.email === email) {

        if (utente.password !== old_password) {
          return false;
        }

        utente.password = newPassword;
        localStorage.setItem(`utente${i}`, JSON.stringify(utente));

        const user = this.utenti.find(u => u.email === email);
        if (user) {
          user.password = newPassword;
        }

        this.salvaAzioneGenerale({
          email: utente.email,
          nome: utente.nome,
          title: "ha modificato la password",
          date: new Date().toISOString().slice(0, 10)
        });

        this.utentiSubject.next(this.utenti);

        return true;
      }

      i++;
    }

    return false;
  }
}
