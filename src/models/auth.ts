import { AuthUserId } from "./authUser";

export interface Token {
  value: string;
  expiringAt: string;
}

export interface AuthBag {
  accessToken: Token;
  refreshToken: Token;
  authUserId: AuthUserId;
}
