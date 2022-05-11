import type { AxiosPromise } from 'axios';
import type { CourseDto, CourseId, CourseRestDto } from 'models/course';
import { mainAxios } from './helpers/myaxios';
import { preparePageRequest } from './helpers/preparers';
import type { Page, GetCoursesByOwnerIdRequest } from './types';

export const getCoursesByOwnerApi = ({
  employeeId,
  name,
  pagination,
}: GetCoursesByOwnerIdRequest): AxiosPromise<Page<CourseDto>> =>
  mainAxios.get(`/courses/owner/${employeeId}`, {
    params: { name, ...preparePageRequest(pagination) },
  });

export const getCourseByIdApi = (id: CourseId): AxiosPromise<CourseDto> =>
  mainAxios.get(`/courses/${id}`);

export const postCourseApi = (body: CourseRestDto): AxiosPromise<CourseDto> =>
  mainAxios.post(`/courses/`, body);

export const putCourseApi = (
  id: CourseId,
  body: CourseRestDto
): AxiosPromise<CourseDto> => mainAxios.put(`/courses/${id}`, body);

export const deleteCourseApi = (id: CourseId): AxiosPromise<CourseDto> =>
  mainAxios.delete(`/courses/${id}`);
