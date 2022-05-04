import type { EmployeeId } from './employee';
import type { StudentId } from './student';

export enum UserRole {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  HEADMAN = 'HEADMAN',
}

export type AuthUserId = number;

export interface AuthUserDto {
  id: AuthUserId;
  username: string;
  userRole: UserRole;
  employee: EmployeeId | null;
  student: StudentId | null;
  createdAt: string;
  lastModifiedAt: string;
  lastVisitAt: string | null;
}
