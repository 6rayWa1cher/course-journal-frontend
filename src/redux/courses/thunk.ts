import { createAxiosAsyncThunk } from '@redux/utils';
import { getCoursesByOwnerApi, postCourseApi } from 'api/courses';
import { GetCoursesByOwnerIdRequest } from 'api/types';
import { CourseRestDto } from 'models/course';

export const getCourseByEmployeePageThunk = createAxiosAsyncThunk(
  'courses/getSelfPage',
  async (args: GetCoursesByOwnerIdRequest) => {
    const data = (await getCoursesByOwnerApi(args)).data;
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
