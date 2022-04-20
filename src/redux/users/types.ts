import { UserDto } from "src/models/user";

export type UserId = number;

export interface UserState {
  entities: Record<UserId, UserDto>;
  ids: UserId[];
}

export const usersPrefix = "users";
