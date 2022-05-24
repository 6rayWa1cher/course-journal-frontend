import { courseIdFromParamsSelector } from '@redux/courses';
import type { RootState } from '@redux/types';
import { createSelector } from '@reduxjs/toolkit';
import { find } from 'lodash';
import { CourseTokenId } from 'models/courseToken';

export const courseTokensSelector = (state: RootState) => state.courseTokens;

export const courseTokenIdFromParamsSelector = (
  _: unknown,
  { courseTokenId }: { courseTokenId?: CourseTokenId }
) => courseTokenId ?? -1;
export const courseTokenIdsFromParamsSelector = (
  _: unknown,
  { ids }: { ids: CourseTokenId[] }
) => ids;

export const courseTokenByIdSelector = createSelector(
  courseTokensSelector,
  courseTokenIdFromParamsSelector,
  (state, courseTokenId) => state.entities[courseTokenId]
);

export const courseTokenByCourseIdSelector = createSelector(
  courseTokensSelector,
  courseIdFromParamsSelector,
  (state, courseId) => find(state.entities, { course: courseId })
);

export const internalUrlFromCourseTokenSelector = createSelector(
  courseTokenByIdSelector,
  (courseToken) =>
    courseToken != null ? `/ct/${courseToken.token}` : undefined
);
