import { GroupId } from './group';

export type StudentId = number;

export interface StudentDto {
  id: StudentId;
  group: GroupId;
  firstName: string;
  lastName: string;
  middleName: string | null;
  headman: boolean;
  createdAt: string;
  lastModifiedAt: string;
}

export type StudentRestDto = Omit<
  StudentDto,
  'id' | 'createdAt' | 'lastModifiedAt' | 'headman'
>;
