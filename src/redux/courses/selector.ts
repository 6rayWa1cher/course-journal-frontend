import type { RootState } from '@redux/types';
import { createSelector } from '@reduxjs/toolkit';
import { CourseId } from 'models/course';

const coursesSelector = (state: RootState) => state.courses;

export const courseIdFromParamsSelector = (
  _: any,
  { courseId }: { courseId: CourseId }
) => courseId;
export const courseIdsFromParamsSelector = (
  _: any,
  { ids }: { ids: CourseId[] }
) => ids;

export const courseByIdSelector = createSelector(
  coursesSelector,
  courseIdFromParamsSelector,
  (state, courseId) => state.entities[courseId]
);
