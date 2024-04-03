import {Injectable} from '@angular/core';
import {jwtDecode} from "jwt-decode";

enum TokenType {
  ACCESS = 'AccessToken',
  REFRESH = 'RefreshToken'
}

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  setToken(name: string, token: string) {
    localStorage.setItem(name, token);
  }

  setAccessToken(token: string) {
    this.setToken(TokenType.ACCESS, token);
  }

  setRefreshToken(token: string) {
    this.setToken(TokenType.REFRESH, token);
  }

  setUsername(user: string) {
    localStorage.setItem('user', user);
  }

  getAccessToken() {
    return localStorage.getItem(TokenType.ACCESS);
  }

  getRefreshToken() {
    return localStorage.getItem(TokenType.REFRESH);
  }

  getUsername() {
    return localStorage.getItem('user') ?? '';
  }

  removeAccessToken() {
    localStorage.removeItem(TokenType.ACCESS);
  }

  removeRefreshToken() {
    localStorage.removeItem(TokenType.REFRESH);
  }

  removeUsername() {
    localStorage.removeItem('user');
  }

  storeUserAndTokensToStorage(username: string, token: string, refreshToken: string) {
    this.setUsername(username);
    this.setAccessToken(token);
    this.setRefreshToken(refreshToken);
  }

  removeUserAndTokenFromStorage() {
    this.removeUsername();
    this.removeAccessToken();
    this.removeRefreshToken();
  }

  isTokenExpired(token: string): boolean {
    const decodedToken: any = jwtDecode(token);
    if (decodedToken.exp === undefined) {
      return false;
    }
    const expirationDate: Date = new Date(0);
    expirationDate.setUTCSeconds(decodedToken.exp);
    return expirationDate.valueOf() <= new Date().valueOf();
  }
}
