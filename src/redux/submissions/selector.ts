import type { RootState } from '@redux/types';
import { createSelector } from '@reduxjs/toolkit';
import { SubmissionDto, SubmissionId } from 'models/submission';
import { studentIdFromParamsSelector } from '@redux/students';
import {
  taskByIdSelector,
  taskIdFromParamsSelector,
  tasksByCourseSelector,
} from '@redux/tasks';
import { find } from 'lodash';

export const submissionsSelector = (state: RootState) => state.submissions;

export const submissionIdFromParamsSelector = (
  _: unknown,
  { submissionId }: { submissionId?: SubmissionId }
) => submissionId ?? -1;
export const submissionIdsFromParamsSelector = (
  _: unknown,
  { ids }: { ids: SubmissionId[] }
) => ids;

export const submissionByIdSelector = createSelector(
  submissionsSelector,
  submissionIdFromParamsSelector,
  (state, submissionId) => state.entities[submissionId]
);

export const submissionsByIdsSelector = createSelector(
  submissionsSelector,
  submissionIdsFromParamsSelector,
  (state, ids) => ids.map((id) => state.entities[id])
);

export const submissionsByStudentAndCourseSelector = createSelector(
  submissionsSelector,
  tasksByCourseSelector,
  studentIdFromParamsSelector,
  (state, tasks, studentId) => {
    if (studentId == null || tasks.length === 0) return [];
    const set = new Set(tasks.map((v) => v.id));
    return Object.values(state.entities).filter(
      (s): s is SubmissionDto => s?.student === studentId && set.has(s?.task)
    );
  }
);

export const submissionByStudentAndTaskSelector = createSelector(
  submissionsSelector,
  taskIdFromParamsSelector,
  studentIdFromParamsSelector,
  (state, taskId, studentId) =>
    find(state.entities, { task: taskId, student: studentId })
);
