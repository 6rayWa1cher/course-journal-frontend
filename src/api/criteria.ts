import { AxiosPromise } from 'axios';
import { CriteriaDto, CriteriaId, CriteriaRestDto } from 'models/criteria';
import { mainAxios } from './helpers/myaxios';
import { TaskId } from 'models/task';
import { SetCriteriaForTaskRequest } from './types';

export const getCriteriaByIdApi = (
  criteriaId: CriteriaId
): AxiosPromise<CriteriaDto> => mainAxios.get(`/criteria/${criteriaId}`);

export const getCriteriaByTaskIdApi = (
  taskId: TaskId
): AxiosPromise<CriteriaDto[]> => mainAxios.get(`/criteria/task/${taskId}`);

export const createCriteriaApi = (
  data: CriteriaRestDto
): AxiosPromise<CriteriaDto> => mainAxios.post('/criteria/', data);

export const setCriteriaForTaskApi = (
  taskId: TaskId,
  data: SetCriteriaForTaskRequest
): AxiosPromise<CriteriaDto[]> =>
  mainAxios.post(`/criteria/task/${taskId}/set`, data);

export const putCriteriaApi = (
  criteriaId: CriteriaId,
  data: CriteriaRestDto
): AxiosPromise<CriteriaDto> => mainAxios.put(`/criteria/${criteriaId}`, data);

export const deleteCriteriaApi = (criteriaId: CriteriaId): AxiosPromise<void> =>
  mainAxios.delete(`/criteria/${criteriaId}`);
