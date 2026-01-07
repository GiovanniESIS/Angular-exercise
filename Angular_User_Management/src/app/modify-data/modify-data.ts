import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Users } from '../users/users';

@Component({
  selector: 'app-modify-data',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './modify-data.html',
  styleUrl: './modify-data.css',
})
export class ModifyData {
  email  = '';
  old_password = '';
  password = '';
  confirm_password = '';
  err = '';
  isError = false;
  showPassword: boolean = false;
  nome_check: string = "Mostra password";
  togglePassword() {
    this.showPassword = !this.showPassword;
    if (this.showPassword) {
      this.nome_check = "Nascondi password";
    } else {
      this.nome_check = "Mostra password";
    }
  }

  constructor(
    private userService: Users,
    private router: Router
    
  ) {}

  ngOnInit() {
    const savedEmail = this.userService.getSelectedEmail();

    if (!savedEmail) {
      this.router.navigate(['/list_users']);
      return;
    }

    this.email = savedEmail;
  }
  modify() {
    if (!this.password || !this.confirm_password) {
      this.showError('Compila tutti i campi');
      return;
    }

    if (this.password !== this.confirm_password) {
      this.showError('Le password non coincidono');
      return;
    }

   

  const success = this.userService.updatePassword(
    this.email,
    this.old_password,
    this.password
  );

    if (success) {
      this.router.navigate(['/list_users']);
    } else {
      this.showError('Vecchia password errata');
    }
  }

  private showError(msg: string) {
    this.err = msg;
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
      this.err = '';
    }, 2000);
  }
}
