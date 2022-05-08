import { createAxiosAsyncThunk } from '@redux/utils';
import { getAuthUserByStudentIdApi } from 'api/authUsers';
import { isAxiosError } from 'api/helpers/utils';
import {
  batchCreateStudentApi,
  createStudentApi,
  deleteStudentApi,
  getStudentByIdApi,
  getStudentsByGroupIdApi,
  putStudentApi,
} from 'api/students';
import { BatchCreateStudentRequest } from 'api/types';
import { GroupId } from 'models/group';
import { StudentId, StudentRestDto } from 'models/student';

export interface StudentByIdArgs {
  studentId: StudentId;
}

export const getStudentByIdThunk = createAxiosAsyncThunk(
  'students/getById',
  async ({ studentId }: StudentByIdArgs) => {
    const data = (await getStudentByIdApi(studentId)).data;
    return data;
  }
);

export const getStudentWithAuthUserThunk = createAxiosAsyncThunk(
  'students/getWithAuthUser',
  async ({ studentId }: StudentByIdArgs) => {
    const student = (await getStudentByIdApi(studentId)).data;
    try {
      const authUser = (await getAuthUserByStudentIdApi(studentId)).data;
      return { student, authUser };
    } catch (e) {
      if (isAxiosError(e) && e.response?.status === 404) {
        return { student };
      }
      throw e;
    }
  }
);

export interface GetStudentsByGroupIdArgs {
  groupId: GroupId;
}

export const getStudentsByGroupIdThunk = createAxiosAsyncThunk(
  'students/getAll',
  async ({ groupId }: GetStudentsByGroupIdArgs) => {
    const data = (await getStudentsByGroupIdApi(groupId)).data;
    return data;
  }
);

export const createStudentThunk = createAxiosAsyncThunk(
  'students/create',
  async (args: StudentRestDto) => {
    const student = (await createStudentApi(args)).data;
    return student;
  }
);

export const batchCreateStudentThunk = createAxiosAsyncThunk(
  'students/batchCreate',
  async (args: BatchCreateStudentRequest) => {
    const students = (await batchCreateStudentApi(args)).data;
    return students;
  }
);

export interface PutStudentArgs {
  studentId: StudentId;
  data: StudentRestDto;
}

export const putStudentThunk = createAxiosAsyncThunk(
  'students/put',
  async ({ studentId, data }: PutStudentArgs) => {
    const student = (await putStudentApi(studentId, data)).data;
    return student;
  }
);

export type DeleteStudentArgs = StudentByIdArgs;

export const deleteStudentThunk = createAxiosAsyncThunk(
  'students/delete',
  async ({ studentId }: DeleteStudentArgs) => {
    await deleteStudentApi(studentId);
    return studentId;
  }
);
