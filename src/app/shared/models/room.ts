
export interface RoomTransport {
  id: number;
  name: string;
  type: RoomType;
}

export enum RoomType {
  DM = 'DM',
  GROUP = 'GROUP',
}

export interface RoomListTransport {
  roomTransports: RoomTransport[];
}
