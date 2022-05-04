import type { AuthUserDto, AuthUserId } from 'models/authUser';

export interface AuthUserState {
  entities: Record<AuthUserId, AuthUserDto>;
  ids: AuthUserId[];
}
