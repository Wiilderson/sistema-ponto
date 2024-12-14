import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { FirebaseService } from './services/firebase.service';

export const authGuard: CanActivateFn = (route, state) => {
  const firebaseService = inject(FirebaseService); // Injeção do serviço
  const router = inject(Router); // Injeção do roteador

  return firebaseService.isLoggedIn().pipe(
    map((isLoggedIn) => {
      if (!isLoggedIn) {
        router.navigate(['/login']); // Redireciona para login se não autenticado
        return false;
      }
      return true; // Permite acesso se autenticado
    }),
    catchError(() => {
      router.navigate(['/login']); // Redireciona em caso de erro
      return of(false); // Bloqueia o acesso em caso de erro
    })
  );
};
