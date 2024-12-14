import { Routes } from '@angular/router';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { ListagemComponent } from './components/listagem/listagem.component';
import { LoginComponent } from './components/login/login.component';
import { MarcarPontoComponent } from './components/marcar-ponto/marcar-ponto.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'listagem', component: ListagemComponent, canActivate: [authGuard] },
  { path: 'ponto', component: MarcarPontoComponent, canActivate: [authGuard] },
];
