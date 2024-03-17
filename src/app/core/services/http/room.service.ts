import {DataService} from "./data.service";
import {RoomListTransport, RoomTransport} from "../../../shared/models/room";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {MessageListTransport} from "../../../shared/models/message";

@Injectable({
  providedIn: 'root',
})
export class RoomService extends DataService<RoomTransport, RoomListTransport> {
  constructor(private httpClient: HttpClient) {
    super(httpClient);
    this.apiUrl = 'rooms';
  }

  getRoomMessages(roomId: number): Observable<MessageListTransport> {
    return this.httpClient.get<MessageListTransport>(`${this.url}/${this.apiUrl}/${roomId}/messages`);
  }
}
