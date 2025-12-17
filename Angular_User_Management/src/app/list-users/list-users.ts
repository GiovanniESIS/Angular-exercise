import { Component } from '@angular/core';
import { Users } from '../users/users';
import { Persona } from '../users/Persona';
import { Router} from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-list-users',
  imports: [FormsModule],
  templateUrl: './list-users.html',
  styleUrl: './list-users.css',
})
export class ListUsers {
nome: string = '';
  email: string = '';
  password: string = '';

  utenti: Persona[] = [];
  
  constructor(private userService: Users, private router: Router) {
    this.userService.getUtenti().subscribe(u => this.utenti = u);
  }

  
  eliminaUtente(email: string){
    this.userService.eliminaUtente(email)
  }

  tornaHome() {
    this.router.navigate(['/']);
  }
}
