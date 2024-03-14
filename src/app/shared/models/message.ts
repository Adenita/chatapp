import {UserTransport} from "./user";
import {RoomTransport} from "./room";

export interface MessageTransport {
  id: number;
  content: string;
  userTransport: UserTransport;
  roomTransport: RoomTransport;
}

export interface MessageListTransport {
  messageTransports: MessageTransport[];
}
