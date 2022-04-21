import { UserId } from "@redux/users/types";

export interface Token {
  value: string;
  expiringAt: string;
}

export interface AuthBag {
  accessToken: Token;
  refreshToken: Token;
  userId: UserId;
}

export interface AuthState {
  bag: AuthBag | null;
  currentRequestId: string | null;
}

export const authPrefix = "auth";
