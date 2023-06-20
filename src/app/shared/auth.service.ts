import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationClient } from '../shared/authentication.client';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;
  username = "admin";
  password = "admin"

  private tokenKey = 'token';

  constructor(
    private router: Router
  ) { }

  // théoriquement, on devrait passer en paramètre le login
  // et le password, cette méthode devrait faire une requête
  // vers un Web Service pour vérifier que c'est ok, renvoyer
  // un token d'authentification JWT etc.
  // // elle devrait renvoyer un Observable etc.
  // logIn() {
  //   console.log("ON SE LOGGE")
  //   this.loggedIn = true;
  // }

  public login(username: string, password: string){
    if (username == this.username && password == this.password) {
      console.log("ON SE LOGGE")
      this.loggedIn = true;
      this.router.navigate(['/home']);
    } else {
      this.loggedIn = false;
    }
    // this.authenticationClient.login(username, password).subscribe((token) => {
    //   localStorage.setItem(this.tokenKey, token);
    //   this.router.navigate(['/']);
    // });
  }

  // logOut() {
  //   console.log("ON SE DELOGGE")

  //   this.loggedIn = false;
  // }
  public logout() {
    // localStorage.removeItem(this.tokenKey);
    this.loggedIn = false;
    this.router.navigate(['/login']);
  }

  // si on l'utilisait on ferai isAdmin().then(...)
  isAdmin() {
    // Pour le moment, version simplifiée...
    // on suppose qu'on est admin si on est loggué
    const isUserAdminPromise = new Promise((resolve, reject) => {
        resolve(this.loggedIn);
    });

    // on renvoie la promesse qui dit si on est admin ou pas
    return isUserAdminPromise;
  }

  
  public isLoggedIn(): boolean {
    // let token = localStorage.getItem(this.tokenKey);
    return this.loggedIn;//token != null && token.length > 0;
  }

  public getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null;
  }
}
