import { createAxiosAsyncThunk } from '@redux/utils';
import {
  createAuthUserApi,
  deleteAuthUserApi,
  getAuthUserByStudentIdApi,
  patchAuthUserApi,
} from 'api/authUsers';
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
import { AuthUserDto, AuthUserId, UserRole } from 'models/authUser';
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

export interface PutStudentWithAuthUserArgs {
  studentId: StudentId;
  student: StudentRestDto;
  headman: boolean;
  authUserId?: AuthUserId;
  authUser?: {
    username: string;
    password?: string;
  };
}

export const putStudentWithAuthUserThunk = createAxiosAsyncThunk(
  'students/putWithAuthUser',
  async ({
    studentId,
    student,
    headman,
    authUserId,
    authUser,
  }: PutStudentWithAuthUserArgs) => {
    const putStudent = async () =>
      (await putStudentApi(studentId, student)).data;
    const authUserExists = authUserId != null;
    if (headman && authUserExists) {
      const modifiedAuthUser =
        authUser != null
          ? (await patchAuthUserApi(authUserId, authUser)).data
          : null;
      const modifiedStudent = await putStudent();
      return { student: modifiedStudent, authUser: modifiedAuthUser };
    } else if (headman && !authUserExists) {
      if (authUser == null) {
        throw new Error('authUser is not present');
      }
      if (authUser.password == null) {
        throw new Error('password is not present');
      }
      const authUserRequest = {
        username: authUser.username,
        password: authUser.password as string,
        userRole: UserRole.HEADMAN,
        userInfo: studentId,
      };
      const createdAuthUser = (await createAuthUserApi(authUserRequest)).data;
      const modifiedStudent = await putStudent();
      return { student: modifiedStudent, authUser: createdAuthUser };
    } else if (!headman && authUserExists) {
      await deleteAuthUserApi(authUserId);
      const modifiedStudent = await putStudent();
      return { student: modifiedStudent };
    } else {
      const modifiedStudent = await putStudent();
      return { student: modifiedStudent };
    }
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
