import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from './http/authentication.service';
import {FormGroup} from '@angular/forms';
import {TokenTransport} from '../../shared/models/authentication';
import {BehaviorSubject} from "rxjs";
import {StorageService} from "./storage.service";

@Injectable({
  providedIn: 'root',
})
export class AuthenticationManagerService {
  storedUser$: BehaviorSubject<string | null>;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private storageService: StorageService
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
            this.storageService.storeUserAndTokensToStorage(tokenTransport.username, tokenTransport.token, tokenTransport.refreshToken)
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
            this.storageService.storeUserAndTokensToStorage(tokenTransport.username, tokenTransport.token, tokenTransport.refreshToken)
            this.storedUser$.next(tokenTransport.username);
            this.router.navigate(['/']).then(() => {});
          },
        });
    }
  }

  logout() {
    this.storageService.removeUserAndTokenFromStorage();
    this.storedUser$.next(null);
    this.router.navigate(['login'])
  }

  isLoggedIn() {
    return !!this.storageService.getAccessToken();
  }
}
