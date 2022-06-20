import { CourseId } from './course';

export type CourseTokenId = number;

export interface CourseTokenDto {
  id: CourseTokenId;
  course: CourseId;
  token: string;
  createdAt: string;
  lastModifiedAt: string;
}

export type CourseTokenRestDto = Pick<CourseTokenDto, 'course'>;
