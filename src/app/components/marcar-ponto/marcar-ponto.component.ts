import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { collection } from 'firebase/firestore';
import { Firestore, getDocs, query, where } from '@angular/fire/firestore';

@Component({
  selector: 'app-marcar-ponto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './marcar-ponto.component.html',
  styleUrl: './marcar-ponto.component.scss',
})
export class MarcarPontoComponent {
  codigo: number = 0;
  mensagem: string = '';
  pontoRegistrado: any;
  timeFormated: string = '';

  constructor(
    private pontoService: FirebaseService,
    private firestore: Firestore
  ) {}

  marcarPonto(): void {
    if (this.codigo) {
      this.pontoService.marcarPonto(this.codigo).subscribe({
        next: (response) => {
          this.mensagem = response.message || 'Ponto registrado com sucesso!';
          this.buscarPonto();
        },
        error: (err) => {
          this.mensagem = 'Erro ao registrar ponto: ' + err.message;
        },
      });
    } else {
      this.mensagem = 'Por favor, insira o código do usuário.';
    }
  }

  buscarPonto(): void {
    const pontosCollection = collection(this.firestore, 'pontos');
    const q = query(pontosCollection, where('user.code', '==', this.codigo));

    getDocs(q)
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          this.pontoRegistrado = querySnapshot.docs[0].data();
          this.timeFormated = this.formatarData(this.pontoRegistrado.timestamp);
        } else {
          this.pontoRegistrado = null;
          this.mensagem = 'Nenhum ponto encontrado para este código.';
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar ponto: ', error);
        this.mensagem = 'Erro ao buscar ponto.';
      });
  }

  formatarData(timestamp: any): string {
    if (!timestamp || !timestamp.seconds) {
      return '';
    }
    const date = new Date(
      timestamp.seconds * 1000 + (timestamp.nanoseconds || 0) / 1000000
    );
    return date.toLocaleString(); // Retorna a data no formato local
  }
}
