import { AuthBag } from 'models/auth';

export interface AuthState {
  bag: AuthBag | null;
  courseToken: string | null;
  currentRequestId: string | null;
}
