import {Role} from "./user";

export interface RegisterTransport {
  name: string;
  username: string;
  password: string;
  role: Role;
}

export interface LoginTransport {
  username: string;
  password: string;
}

export interface TokenTransport {
  token: string;
  refreshToken: string;
  username: string;
  role: Role;
}
