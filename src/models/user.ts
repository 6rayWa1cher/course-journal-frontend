export enum UserRole {
  ADMIN = "ADMIN",
  TEACHER = "TEACHER",
}

export interface UserDto {
  id: number;
  username: string;
  userRole: UserRole;
  firstName: string | null;
  middleName: string | null;
  lastName: string | null;
  createdAt: string;
  lastModifiedAt: string;
  lastVisitAt: string | null;
}
