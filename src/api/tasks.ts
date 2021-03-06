import { AxiosPromise } from 'axios';
import { CourseId } from 'models/course';
import { TaskId, TaskDto, TaskRestDto, ShortTaskRestDto } from 'models/task';
import { mainAxios } from './helpers/myaxios';

export const getTaskByIdApi = (taskId: TaskId): AxiosPromise<TaskDto> =>
  mainAxios.get(`/tasks/${taskId}`);

export const getTasksByCourseIdApi = (
  courseId: CourseId
): AxiosPromise<ShortTaskRestDto[]> =>
  mainAxios.get(`/tasks/course/${courseId}/all`);

export const createTaskApi = (data: TaskRestDto): AxiosPromise<TaskDto> =>
  mainAxios.post('/tasks/', data);

export const putTaskApi = (
  taskId: TaskId,
  data: TaskRestDto
): AxiosPromise<TaskDto> => mainAxios.put(`/tasks/${taskId}`, data);

export const deleteTaskApi = (taskId: TaskId): AxiosPromise<void> =>
  mainAxios.delete(`/tasks/${taskId}`);
