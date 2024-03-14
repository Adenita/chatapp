export interface UserTransport {
  id: number;
  name: string;
  role: Role;
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface UserListTransport {
  userTransports: UserTransport[];
}
