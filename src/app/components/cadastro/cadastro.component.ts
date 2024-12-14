import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection } from 'firebase/firestore';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
})
export class CadastroComponent {
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
  user = {
    name: '',
    cpf: '',
    email: '',
    code: 0,
    password: '',
  };

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) {}
  async registerUser() {
    try {
      const { name, email, password, cpf, code } = this.user;
      await this.firebaseService.signUp(name, email, password, cpf, code);
      console.log('Usuário cadastrado com sucesso!');
      alert('Usuário criado com sucesso!');
      this.router.navigate(['/listagem']); // Redireciona para a página de listagem após o cadastro
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      alert('Erro ao cadastrar usuário.');
    }
  }
}
