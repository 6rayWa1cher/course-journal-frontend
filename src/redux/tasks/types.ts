import type { ShortTaskRestDto, TaskDto, TaskId } from 'models/task';

export interface TasksState {
  entities: Record<TaskId, TaskDto | ShortTaskRestDto>;
  ids: TaskId[];
}
