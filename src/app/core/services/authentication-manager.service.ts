import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './http/authentication.service';
import { FormGroup } from '@angular/forms';
import { TokenTransport } from '../../shared/models/authentication';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationManagerService {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {}

  login(loginForm: FormGroup) {
    if (loginForm.valid) {
      this.authenticationService
        .login(loginForm.value)
        .pipe()
        .subscribe({
          next: (tokenTransport: TokenTransport) => {
            this.router.navigate(['/']).then(() => {
              localStorage.setItem('user_id', JSON.stringify({ username: tokenTransport.username, role: tokenTransport.role }));
              localStorage.setItem('user_token', tokenTransport.token);
            });
          },
        });
    }
  }

  logout() {
    this.router.navigate(['/']).then(() => {
      localStorage.removeItem('user_token');
      localStorage.removeItem('user_id');
    });
  }

  getToken() {
    return localStorage.getItem('user_token');
  }

  getUser() {
    const user = localStorage.getItem('user_id');
    return JSON.parse(user || '""');
  }
}
