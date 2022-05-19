import { createAxiosAsyncThunk } from '@redux/utils';
import {
  createCriteriaApi,
  deleteCriteriaApi,
  getCriteriaByCourseIdApi,
  getCriteriaByIdApi,
  getCriteriaByTaskIdApi,
  putCriteriaApi,
} from 'api/criteria';
import { CourseId } from 'models/course';
import { CriteriaId, CriteriaRestDto } from 'models/criteria';
import { TaskId } from 'models/task';

export interface CriteriaByIdArgs {
  criteriaId: CriteriaId;
}

export const getCriteriaByIdThunk = createAxiosAsyncThunk(
  'criteria/getById',
  async ({ criteriaId }: CriteriaByIdArgs) => {
    const data = (await getCriteriaByIdApi(criteriaId)).data;
    return data;
  }
);

export interface GetCriteriaByTaskIdArgs {
  taskId: TaskId;
}

export const getCriteriaByTaskIdThunk = createAxiosAsyncThunk(
  'criteria/getAll',
  async ({ taskId }: GetCriteriaByTaskIdArgs) => {
    const data = (await getCriteriaByTaskIdApi(taskId)).data;
    return data;
  }
);

export interface GetCriteriaByCourseIdArgs {
  courseId: CourseId;
}

export const getCriteriaByCourseIdThunk = createAxiosAsyncThunk(
  'criteria/getByCourseId',
  async ({ courseId }: GetCriteriaByCourseIdArgs) => {
    const data = (await getCriteriaByCourseIdApi(courseId)).data;
    return data;
  }
);

export const createCriteriaThunk = createAxiosAsyncThunk(
  'criteria/create',
  async (args: CriteriaRestDto) => {
    const employee = (await createCriteriaApi(args)).data;
    return employee;
  }
);

export interface PutCriteriaArgs {
  criteriaId: CriteriaId;
  data: CriteriaRestDto;
}

export const putCriteriaThunk = createAxiosAsyncThunk(
  'criteria/put',
  async ({ criteriaId, data }: PutCriteriaArgs) => {
    const employee = (await putCriteriaApi(criteriaId, data)).data;
    return employee;
  }
);

export type DeleteCriteriaArgs = CriteriaByIdArgs;

export const deleteCriteriaThunk = createAxiosAsyncThunk(
  'criteria/delete',
  async ({ criteriaId }: DeleteCriteriaArgs) => {
    await deleteCriteriaApi(criteriaId);
    return criteriaId;
  }
);
