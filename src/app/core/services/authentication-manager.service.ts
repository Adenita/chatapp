import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from './http/authentication.service';
import {FormGroup} from '@angular/forms';
import {TokenTransport} from '../../shared/models/authentication';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthenticationManagerService {
  storedUser$: BehaviorSubject<string | null>;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
    this.storedUser$ = new BehaviorSubject<string | null>(localStorage.getItem('user_id'))
  }

  login(loginForm: FormGroup) {
    if (loginForm.valid) {
      this.authenticationService
        .login(loginForm.value)
        .pipe()
        .subscribe({
          next: (tokenTransport: TokenTransport) => {
            this.storeUserToLocalStorage(tokenTransport.username, tokenTransport.token)
            this.storedUser$.next(tokenTransport.username);
            this.router.navigate(['/'])
          },
        });
    }
  }

  register(registerForm: FormGroup) {
    if (registerForm.valid) {
      this.authenticationService
        .register(registerForm.value)
        .pipe()
        .subscribe({
          next: (tokenTransport: TokenTransport) => {
            console.log("registered transport: ", tokenTransport)
            this.storeUserToLocalStorage(tokenTransport.username, tokenTransport.token)
            this.storedUser$.next(tokenTransport.username);
            this.router.navigate(['/']).then(() => {
            });
          },
        });
    }
  }

  logout() {
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_id');
    this.storedUser$.next(null);
    this.router.navigate(['login'])
  }

  storeUserToLocalStorage(username: string, token: string) {
    localStorage.setItem('user_id', username);
    localStorage.setItem('user_token', token);
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  getToken() {
    return localStorage.getItem('user_token');
  }

  getUsername() {
    return localStorage.getItem('user_id') ?? '';
  }
}
