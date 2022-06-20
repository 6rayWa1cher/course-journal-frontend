import { createAxiosAsyncThunk } from '@redux/utils';
import { createCriteriaApi, setCriteriaForTaskApi } from 'api/criteria';
import {
  createTaskApi,
  deleteTaskApi,
  getTaskByIdApi,
  getTasksByCourseIdApi,
  putTaskApi,
} from 'api/tasks';
import { CourseId } from 'models/course';
import { CriteriaDto } from 'models/criteria';
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

export interface CreateTaskWithCriteriaArgs {
  task: TaskRestDto;
  criteria: {
    name: string;
    criteriaPercent: number;
  }[];
}

export const createTaskWithCriteriaThunk = createAxiosAsyncThunk(
  'tasks/createWithCriteria',
  async ({ task, criteria }: CreateTaskWithCriteriaArgs) => {
    const savedTask = (await createTaskApi(task)).data;
    const taskId = savedTask.id;
    const savedCriteria: CriteriaDto[] = [];
    try {
      for (const criteriaReqData of criteria) {
        const req = {
          ...criteriaReqData,
          task: taskId,
        };
        const criteriaResData = (await createCriteriaApi(req)).data;
        savedCriteria.push(criteriaResData);
      }
    } catch (e) {
      await deleteTaskApi(taskId);
      throw e;
    }
    return { task: savedTask, criteria: savedCriteria };
  }
);

export interface PutTaskWithCriteriaArgs extends CreateTaskWithCriteriaArgs {
  taskId: TaskId;
}

export const putTaskWithCriteriaThunk = createAxiosAsyncThunk(
  'tasks/putWithCriteria',
  async ({ task, taskId, criteria }: PutTaskWithCriteriaArgs) => {
    const savedTask = (await putTaskApi(taskId, task)).data;
    const savedCriteria = (await setCriteriaForTaskApi(taskId, { criteria }))
      .data;
    return { task: savedTask, criteria: savedCriteria };
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
