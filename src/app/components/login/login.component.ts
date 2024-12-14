import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  navigateToRegister() {
    this.router.navigate(['/cadastro']);
  }
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private auth: FirebaseService) {}

  onLogin() {
    this.auth
      .login(this.email, this.password)
      .then(() => {
        this.router.navigate(['/listagem']); // Redireciona após login
      })
      .catch((error: Error) => {
        this.errorMessage = error.message;
      });
  }
}
