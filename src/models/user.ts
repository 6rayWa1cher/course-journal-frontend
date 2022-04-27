import { UserId } from "@redux/users";

export enum UserRole {
  ADMIN = "ADMIN",
  TEACHER = "TEACHER",
}

export interface UserDto {
  id: UserId;
  username: string;
  userRole: UserRole;
  firstName: string | null;
  middleName: string | null;
  lastName: string | null;
  createdAt: string;
  lastModifiedAt: string;
  lastVisitAt: string | null;
}
