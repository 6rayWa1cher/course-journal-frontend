import type { CourseDto, CourseFullDto, CourseId } from 'models/course';

export interface CourseState {
  entities: Record<CourseId, CourseDto | CourseFullDto>;
  ids: CourseId[];
}
