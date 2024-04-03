import {DataService} from "./data.service";
import {UserListTransport, UserTransport} from "../../../shared/models/user";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {RoomListTransport} from "../../../shared/models/room";

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

  getUserRooms(userId: number): Observable<RoomListTransport> {
    return this.httpClient.get<RoomListTransport>(`${this.url}/${this.apiUrl}/${userId}/rooms`);
  }

  getUserDMs(userId: number): Observable<RoomListTransport> {
    return this.httpClient.get<RoomListTransport>(`${this.url}/${this.apiUrl}/${userId}/dms`);
  }

  getUserChannels(userId: number): Observable<RoomListTransport> {
    return this.httpClient.get<RoomListTransport>(`${this.url}/${this.apiUrl}/${userId}/channels`);
  }

  getAvailableNonUserChannels(userId: number): Observable<RoomListTransport> {
    return this.httpClient.get<RoomListTransport>(`${this.url}/${this.apiUrl}/${userId}/non`);
  }

}

