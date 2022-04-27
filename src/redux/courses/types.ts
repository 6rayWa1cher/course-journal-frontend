import { CourseDto } from "models/course";

export type CourseId = number;

export interface CourseState {
  entities: Record<CourseId, CourseDto>;
  ids: CourseId[];
}

export const coursesPrefix = "courses";

export interface CoursesGetSelfPageThunkArgs {
  page: number;
}
