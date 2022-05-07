import { createAxiosAsyncThunk } from '@redux/utils';
import {
  createStudentApi,
  deleteStudentApi,
  getStudentByIdApi,
  getStudentsByGroupIdApi,
  putStudentApi,
} from 'api/students';
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
    const employee = (await createStudentApi(args)).data;
    return employee;
  }
);

export interface PutStudentArgs {
  studentId: StudentId;
  data: StudentRestDto;
}

export const putStudentThunk = createAxiosAsyncThunk(
  'students/put',
  async ({ studentId, data }: PutStudentArgs) => {
    const employee = (await putStudentApi(studentId, data)).data;
    return employee;
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
