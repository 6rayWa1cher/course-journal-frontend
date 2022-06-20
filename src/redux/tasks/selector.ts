import { courseIdFromParamsSelector } from '@redux/courses';
import type { RootState } from '@redux/types';
import { createSelector } from '@reduxjs/toolkit';
import { TaskDto, TaskId } from 'models/task';

export const tasksSelector = (state: RootState) => state.tasks;

export const taskIdFromParamsSelector = (
  _: unknown,
  { taskId }: { taskId?: TaskId }
) => taskId ?? -1;
export const taskIdsFromParamsSelector = (
  _: unknown,
  { ids }: { ids: TaskId[] }
) => ids;

export const taskByIdSelector = createSelector(
  tasksSelector,
  taskIdFromParamsSelector,
  (state, taskId) => state.entities[taskId]
);

export const tasksByCourseSelector = createSelector(
  tasksSelector,
  courseIdFromParamsSelector,
  (state, courseId) =>
    Object.values(state.entities).filter(
      (dto): dto is TaskDto => dto?.course === courseId
    )
);

export const tasksByIdsSelector = createSelector(
  tasksSelector,
  taskIdsFromParamsSelector,
  (state, ids) => ids.map((id) => state.entities[id])
);

export const tasksByCourseTaskNumberSortSelector = createSelector(
  tasksByCourseSelector,
  (tasks) =>
    tasks
      .filter((task): task is TaskDto => !!task)
      .sort((a, b) => (a.taskNumber ?? 0) - (b.taskNumber ?? 0))
);

export const taskTitleByIdSelector = createSelector(
  taskByIdSelector,
  (task) => task?.title
);
