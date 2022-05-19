import { createAxiosAsyncThunk } from '@redux/utils';
import {
  createSubmissionApi,
  deleteSubmissionApi,
  getSubmissionByIdApi,
  getSubmissionsByCourseAndStudentApi,
  getSubmissionsByCourseIdApi,
  putSubmissionApi,
  setSubmissionsForStudentAndCourseApi,
} from 'api/submissions';
import { SetSubmissionsForCourseAndStudentRequest } from 'api/types';
import { CourseId } from 'models/course';
import { StudentId } from 'models/student';
import { SubmissionId, SubmissionRestDto } from 'models/submission';

export interface SubmissionByIdArgs {
  submissionId: SubmissionId;
}

export const getSubmissionByIdThunk = createAxiosAsyncThunk(
  'submissions/getById',
  async ({ submissionId }: SubmissionByIdArgs) => {
    const data = (await getSubmissionByIdApi(submissionId)).data;
    return data;
  }
);

export interface GetSubmissionsByCourseIdArgs {
  courseId: CourseId;
}

export const getSubmissionsByCourseIdThunk = createAxiosAsyncThunk(
  'submissions/getAll',
  async ({ courseId }: GetSubmissionsByCourseIdArgs) => {
    const data = (await getSubmissionsByCourseIdApi(courseId)).data;
    return data;
  }
);

export interface GetSubmissionsByCourseAndStudentArgs {
  courseId: CourseId;
  studentId: StudentId;
}

export const getSubmissionsByCourseAndStudentThunk = createAxiosAsyncThunk(
  'submissions/getByCourseAndStudent',
  async ({ courseId, studentId }: GetSubmissionsByCourseAndStudentArgs) => {
    const data = (
      await getSubmissionsByCourseAndStudentApi(courseId, studentId)
    ).data;
    return data;
  }
);

export const createSubmissionThunk = createAxiosAsyncThunk(
  'submissions/create',
  async (args: SubmissionRestDto) => {
    const employee = (await createSubmissionApi(args)).data;
    return employee;
  }
);

export interface PutSubmissionArgs {
  submissionId: SubmissionId;
  data: SubmissionRestDto;
}

export const putSubmissionThunk = createAxiosAsyncThunk(
  'submissions/put',
  async ({ submissionId, data }: PutSubmissionArgs) => {
    const employee = (await putSubmissionApi(submissionId, data)).data;
    return employee;
  }
);

export const setSubmissionsForStudentAndCourseThunk = createAxiosAsyncThunk(
  'submissions/set',
  async (req: SetSubmissionsForCourseAndStudentRequest) => {
    const data = (await setSubmissionsForStudentAndCourseApi(req)).data;
    return data;
  }
);

export type DeleteSubmissionArgs = SubmissionByIdArgs;

export const deleteSubmissionThunk = createAxiosAsyncThunk(
  'submissions/delete',
  async ({ submissionId }: DeleteSubmissionArgs) => {
    await deleteSubmissionApi(submissionId);
    return submissionId;
  }
);
