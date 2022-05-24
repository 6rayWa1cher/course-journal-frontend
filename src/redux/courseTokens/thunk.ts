import { createAxiosAsyncThunk } from '@redux/utils';
import {
  deleteCourseTokenApi,
  getCourseTokenByCourseIdApi,
  getCourseTokenByIdApi,
  issueCourseTokenApi,
  resolveCourseTokenApi,
} from 'api/courseTokens';
import { CourseId } from 'models/course';
import { CourseTokenId } from 'models/courseToken';
import { ResolveCourseTokenRequest } from 'api/types';

export interface CourseTokenByIdArgs {
  courseTokenId: CourseTokenId;
}

export const getCourseTokenByIdThunk = createAxiosAsyncThunk(
  'courseTokens/getById',
  async ({ courseTokenId }: CourseTokenByIdArgs) => {
    const data = (await getCourseTokenByIdApi(courseTokenId)).data;
    return data;
  }
);

export interface GetCourseTokensByCourseIdArgs {
  courseId: CourseId;
}

export const getCourseTokensByCourseIdThunk = createAxiosAsyncThunk(
  'courseTokens/getByCourse',
  async ({ courseId }: GetCourseTokensByCourseIdArgs) => {
    const data = (await getCourseTokenByCourseIdApi(courseId)).data;
    return data;
  }
);

export const resolveCourseTokenThunk = createAxiosAsyncThunk(
  'courseTokens/resolve',
  async (data: ResolveCourseTokenRequest) => {
    const courseToken = (await resolveCourseTokenApi(data)).data;
    return courseToken;
  }
);

export interface IssueCourseTokenArgs {
  course: CourseId;
}

export const issueCourseTokenThunk = createAxiosAsyncThunk(
  'courseTokens/issue',
  async (data: IssueCourseTokenArgs) => {
    const courseToken = (await issueCourseTokenApi(data)).data;
    return courseToken;
  }
);

export interface DeleteCourseTokenArgs {
  courseTokenId: CourseTokenId;
}

export const deleteCourseTokenThunk = createAxiosAsyncThunk(
  'courseTokens/delete',
  async ({ courseTokenId }: DeleteCourseTokenArgs) => {
    await deleteCourseTokenApi(courseTokenId);
    return courseTokenId;
  }
);
