import type { TaskDto, TaskId } from 'models/task';

export interface TasksState {
  entities: Record<TaskId, TaskDto>;
  ids: TaskId[];
}
