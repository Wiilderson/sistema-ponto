import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { BehaviorSubject, map, Observable } from 'rxjs';
import {
  getAuth,
  signInWithEmailAndPassword,
  Auth,
  onAuthStateChanged,
  User,
  signOut,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { Router } from '@angular/router';
import { FirebaseApp } from '@angular/fire/app';
import {
  collection,
  doc,
  Firestore,
  getFirestore,
  setDoc,
} from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  apiUrl: string =
    'http://127.0.0.1:5001/sistema-ponto-fbc41/us-central1/marcarPonto';
  private afAuth: Auth;
  private currentUser = new BehaviorSubject<User | null>(null);
  private firestore: Firestore = getFirestore();

  constructor(
    private http: HttpClient,
    // private functions: AngularFireFunctions,
    private router: Router,
    private firebase: FirebaseApp
  ) {
    this.afAuth = getAuth(firebase);

    const savedUser = localStorage.getItem('firebaseUser');
    if (savedUser) {
      this.currentUser.next(JSON.parse(savedUser)); // Preenche o estado com os dados salvos
    }
    onAuthStateChanged(this.afAuth, (user) => {
      if (user) {
        this.currentUser.next(user);
        localStorage.setItem('firebaseUser', JSON.stringify(user)); // Armazena o usuário no localStorage
      } else {
        this.currentUser.next(null);
        localStorage.removeItem('firebaseUser'); // Limpa o localStorage quando o usuário desloga
      }
    });
  }

  getUser(): Observable<User | null> {
    return this.currentUser.asObservable(); // Retorna o estado do usuário
  }

  marcarPonto(codigo: number): Observable<any> {
    return this.http.post<any>(this.apiUrl, { codigo });
  }

  async login(email: string, password: string): Promise<User | null> {
    return signInWithEmailAndPassword(this.afAuth, email, password).then(
      (result) => {
        this.currentUser.next(result.user);
        localStorage.setItem('firebaseUser', JSON.stringify(result.user)); // Salva no localStorage
        return result.user;
      }
    );
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.afAuth); // Await the signOut operation
      this.currentUser.next(null); // Update user state
      localStorage.removeItem('firebaseUser'); // Clear local storage
      this.router.navigate(['/login']); // Redirect to login page
    } catch (error) {
      console.error('Error during logout:', error);
      // Handle logout errors gracefully (e.g., display error message to user)
    }
  }
  isLoggedIn(): Observable<boolean> {
    return this.getUser().pipe(map((user) => !!user)); // Verifica se está logado
  }

  async signUp(
    name: string,
    email: string,
    password: string,
    cpf: string,
    code: number
  ): Promise<void> {
    try {
      console.log(email, password, name, cpf, code);

      const userCredential = await createUserWithEmailAndPassword(
        this.afAuth,
        email,
        password
      );
      const user = userCredential.user;

      // Adiciona informações adicionais no Firestore
      const usersCollection = collection(this.firestore, 'users');
      const userDoc = doc(usersCollection, user.uid); // Usa o UID do usuário como ID do documento
      await setDoc(userDoc, {
        email: user.email,
        uid: user.uid,
        name: name,
        cpf: cpf,
        code: code,
      });
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw error;
    }
  }

  getUserStorage(): any {
    const storedUser = localStorage.getItem('firebaseUser');

    if (storedUser) {
      return JSON.parse(storedUser); // Retorna o objeto 'user'
    } else {
      return null; // Caso não haja usuário no localStorage
    }
  }
}
