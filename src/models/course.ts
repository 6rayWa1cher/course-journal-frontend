import type { EmployeeId } from "./employee";

export type CourseId = number;

export interface CourseDto {
  id: CourseId;
  name: string;
  owner: EmployeeId;
  createdAt: string;
  lastModifiedAt: string;
}
