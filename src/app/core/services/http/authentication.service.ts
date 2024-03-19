import { Injectable } from '@angular/core';
import { UserListTransport, UserTransport } from '../../../shared/models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {DataService} from "./data.service";
import {LoginTransport, RegisterTransport, TokenTransport} from "../../../shared/models/authentication";

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends DataService<UserTransport, UserListTransport> {
  constructor(private httpClient: HttpClient) {
    super(httpClient);
    this.apiUrl = '';
  }

  register(registerTransport: RegisterTransport): Observable<RegisterTransport> {
    return this.httpClient.post<RegisterTransport>(`${this.url}/register`, registerTransport);
  }

  login(loginTransport: LoginTransport): Observable<TokenTransport> {
    return this.httpClient.post<TokenTransport>(`${this.url}/login`, loginTransport);
  }
}
