import { createAxiosAsyncThunk } from '@redux/utils';
import {
  deleteCourseApi,
  getCourseByIdApi,
  getCoursesByOwnerApi,
  postCourseApi,
} from 'api/courses';
import { GetCoursesByOwnerIdRequest } from 'api/types';
import { CourseId, CourseRestDto } from 'models/course';

export const getCourseByEmployeePageThunk = createAxiosAsyncThunk(
  'courses/getSelfPage',
  async (args: GetCoursesByOwnerIdRequest) => {
    const data = (await getCoursesByOwnerApi(args)).data;
    return data;
  }
);

export interface CourseIdOnly {
  courseId: CourseId;
}

export const getCourseByIdThunk = createAxiosAsyncThunk(
  'courses/getById',
  async ({ courseId }: CourseIdOnly) => {
    const data = (await getCourseByIdApi(courseId)).data;
    return data;
  }
);

export const createCourseThunk = createAxiosAsyncThunk(
  'courses/create',
  async (data: CourseRestDto) => {
    const course = (await postCourseApi(data)).data;
    return course;
  }
);

export const deleteCourseThunk = createAxiosAsyncThunk(
  'courses/delete',
  async ({ courseId }: CourseIdOnly) => {
    await deleteCourseApi(courseId);
    return courseId;
  }
);
