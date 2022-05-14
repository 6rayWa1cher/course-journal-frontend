import { CourseId } from './course';
import { FacultyId } from './faculty';

export type GroupId = number;

export interface GroupDto {
  id: GroupId;
  course: CourseId;
  faculty: FacultyId;
  name: string;
  createdAt: string;
  lastModifiedAt: string;
}

export type GroupRestDto = Omit<
  GroupDto,
  'id' | 'createdAt' | 'lastModifiedAt'
>;
