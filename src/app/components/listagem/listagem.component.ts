import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  getFirestore,
  collection,
  getDocs,
  Firestore,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-listagem',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listagem.component.html',
  styleUrl: './listagem.component.scss',
})
export class ListagemComponent {
  users: any[] = [];
  private firestore: Firestore = inject(Firestore);

  ngOnInit() {
    const usersCollection = collection(this.firestore, 'users');
    getDocs(usersCollection)
      .then((querySnapshot) => {
        this.users = querySnapshot.docs.map((doc) => doc.data());
      })
      .catch((error) => {
        console.error('Erro ao buscar usuários: ', error);
      });
  }
}
