import {DataService} from "./data.service";
import {UserListTransport, UserTransport} from "../../../shared/models/user";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class UserService extends DataService<UserTransport, UserListTransport> {
  constructor(private httpClient: HttpClient) {
    super(httpClient);
    this.apiUrl = 'users';
  }


  getByUsername(username: string): Observable<UserTransport> {
    return this.httpClient.get<UserTransport>(`${this.url}/${this.apiUrl}/${username}$`);
  }
}
