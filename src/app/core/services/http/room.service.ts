import {DataService} from "./data.service";
import {RoomListTransport, RoomTransport} from "../../../shared/models/room";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class RoomService extends DataService<RoomTransport, RoomListTransport> {
  constructor(private httpClient: HttpClient) {
    super(httpClient);
    this.apiUrl = 'rooms';
  }
}
