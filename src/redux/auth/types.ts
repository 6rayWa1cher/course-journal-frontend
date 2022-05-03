import { AuthBag } from "models/auth";

export interface AuthState {
  bag: AuthBag | null;
  currentRequestId: string | null;
}
