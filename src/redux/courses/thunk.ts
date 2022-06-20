import { createAxiosAsyncThunk } from '@redux/utils';
import {
  deleteCourseApi,
  getCourseByIdApi,
  getCoursesByOwnerApi,
  postCourseApi,
  putCourseApi,
} from 'api/courses';
import { isAxiosError } from 'api/helpers/utils';
import { getAllStudentsByCourseIdApi } from 'api/students';
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

export const getCourseByIdWithItsStudentsThunk = createAxiosAsyncThunk(
  'course/getWithItsStudents',
  async ({ courseId }: CourseIdOnly) => {
    const course = (await getCourseByIdApi(courseId)).data;
    try {
      const students = (await getAllStudentsByCourseIdApi(courseId)).data;
      return { course, students };
    } catch (e) {
      if (isAxiosError(e) && e.response?.status === 404) {
        return { course };
      }
      throw e;
    }
  }
);

export const createCourseThunk = createAxiosAsyncThunk(
  'courses/create',
  async (data: CourseRestDto) => {
    const course = (await postCourseApi(data)).data;
    return course;
  }
);

export interface PutCourseArgs {
  courseId: CourseId;
  data: CourseRestDto;
}

export const putCourseThunk = createAxiosAsyncThunk(
  'courses/put',
  async ({ courseId, data }: PutCourseArgs) => {
    const course = (await putCourseApi(courseId, data)).data;
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
