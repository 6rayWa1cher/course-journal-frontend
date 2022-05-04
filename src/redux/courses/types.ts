import type { CourseDto, CourseId } from 'models/course';

export interface CourseState {
  entities: Record<CourseId, CourseDto>;
  ids: CourseId[];
}
