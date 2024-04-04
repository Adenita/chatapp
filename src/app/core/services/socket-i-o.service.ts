import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
// @ts-ignore
import io from 'socket.io-client';

import {MessageTransport} from "../../shared/models/message";

@Injectable({
  providedIn: 'root'
})
export class SocketIOService {
  private socket: any;
  private readonly url: string = 'http://{your-local-ip}:8081';

  connectToSocket(room: string) {
    this.socket = io(this.url, {
      reconnection: false,
      query: {room},
    });

  }

  sendMessage(message: MessageTransport) {
    this.socket.emit('send_message', JSON.stringify(message));
  }

  receiveMessages(roomId: number): Observable<any> {
    return new Observable(observer => {
      this.socket.on(`read_message`, (data: any) => {
        const message = JSON.parse(data);
        observer.next(message);
      });
    });
  }
}
