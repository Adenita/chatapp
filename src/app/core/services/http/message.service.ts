import {DataService} from "./data.service";
import {MessageListTransport, MessageTransport} from "../../../shared/models/message";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class MessageService extends DataService<MessageTransport, MessageListTransport> {
  constructor(private httpClient: HttpClient) {
    super(httpClient);
    this.apiUrl = 'messages';
  }
}
