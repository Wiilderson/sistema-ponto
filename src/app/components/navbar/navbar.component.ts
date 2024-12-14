import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  user: any;
  constructor(private service: FirebaseService) {}
  logout() {
    this.service.logout();
  }

  ngOnInit() {
    // Chama a função getUserStorage() do serviço para pegar os dados do usuário
    this.user = this.service.getUserStorage();
  }
}
