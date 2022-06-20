import { employeeIdFromParamsSelector } from '@redux/employees';
import type { RootState } from '@redux/types';
import { createSelector } from '@reduxjs/toolkit';
import { CourseDto, CourseFullDto, CourseId } from 'models/course';

export const coursesSelector = (state: RootState) => state.courses;

export const courseIdFromParamsSelector = (
  _: unknown,
  { courseId }: { courseId: CourseId }
) => courseId;

export const courseIdsFromParamsSelector = (
  _: unknown,
  { ids }: { ids: CourseId[] }
) => ids;

export const courseByIdSelector = createSelector(
  coursesSelector,
  courseIdFromParamsSelector,
  (state, courseId) => state.entities[courseId] as CourseFullDto
);

export const coursesByEmployeeIdSelector = createSelector(
  coursesSelector,
  employeeIdFromParamsSelector,
  (state, employeeId) =>
    Object.values(state.entities).filter(
      (e): e is CourseDto => e?.owner === employeeId
    )
);

export const courseNameByIdSelector = createSelector(
  courseByIdSelector,
  (course) => course?.name
);

export const resolvedCourseIdSelector = createSelector(
  coursesSelector,
  (state) => state.resolved
);
