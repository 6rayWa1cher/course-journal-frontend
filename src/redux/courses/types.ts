import { EntityState } from '@reduxjs/toolkit';
import type { CourseDto, CourseFullDto, CourseId } from 'models/course';

export interface CourseState extends EntityState<CourseDto | CourseFullDto> {
  resolved?: CourseId;
}
