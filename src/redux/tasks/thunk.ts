import { createAxiosAsyncThunk } from '@redux/utils';
import {
  createTaskApi,
  deleteTaskApi,
  getTaskByIdApi,
  getTasksByCourseIdApi,
  putTaskApi,
} from 'api/tasks';
import { CourseId } from 'models/course';
import { TaskId, TaskRestDto } from 'models/task';

export interface TaskByIdArgs {
  taskId: TaskId;
}

export const getTaskByIdThunk = createAxiosAsyncThunk(
  'tasks/getById',
  async ({ taskId }: TaskByIdArgs) => {
    const data = (await getTaskByIdApi(taskId)).data;
    return data;
  }
);

export interface GetTasksByCourseIdArgs {
  courseId: CourseId;
}

export const getTasksByCourseIdThunk = createAxiosAsyncThunk(
  'tasks/getAll',
  async ({ courseId }: GetTasksByCourseIdArgs) => {
    const data = (await getTasksByCourseIdApi(courseId)).data;
    return data;
  }
);

export const createTaskThunk = createAxiosAsyncThunk(
  'tasks/create',
  async (args: TaskRestDto) => {
    const task = (await createTaskApi(args)).data;
    return task;
  }
);

export interface PutTaskArgs {
  taskId: TaskId;
  data: TaskRestDto;
}

export const putTaskThunk = createAxiosAsyncThunk(
  'tasks/put',
  async ({ taskId, data }: PutTaskArgs) => {
    const task = (await putTaskApi(taskId, data)).data;
    return task;
  }
);
export type DeleteTaskArgs = TaskByIdArgs;

export const deleteTaskThunk = createAxiosAsyncThunk(
  'tasks/delete',
  async ({ taskId }: DeleteTaskArgs) => {
    await deleteTaskApi(taskId);
    return taskId;
  }
);
