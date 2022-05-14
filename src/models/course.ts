import type { EmployeeId } from './employee';
import { StudentId } from './student';

export type CourseId = number;

export interface CourseDto {
  id: CourseId;
  name: string;
  owner: EmployeeId;
  createdAt: string;
  lastModifiedAt: string;
}

export interface CourseFullDto extends CourseDto {
  students: StudentId[];
}

export type CourseRestDto = Omit<
  CourseFullDto,
  'id' | 'createdAt' | 'lastModifiedAt'
>;
