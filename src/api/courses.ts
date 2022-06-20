import type { AxiosPromise } from 'axios';
import type {
  CourseDto,
  CourseFullDto,
  CourseId,
  CourseRestDto,
} from 'models/course';
import { mainAxios } from './helpers/myaxios';
import { preparePageRequest } from './helpers/preparers';
import type {
  Page,
  GetCoursesByOwnerIdRequest,
  GetCoursesByGroupIdRequest,
} from './types';

export const getCoursesByOwnerApi = ({
  employeeId,
  name,
  pagination,
}: GetCoursesByOwnerIdRequest): AxiosPromise<Page<CourseDto>> =>
  mainAxios.get(`/courses/owner/${employeeId}`, {
    params: { name, ...preparePageRequest(pagination) },
  });

export const getCourseByIdApi = (id: CourseId): AxiosPromise<CourseFullDto> =>
  mainAxios.get(`/courses/${id}`);

export const postCourseApi = (
  body: CourseRestDto
): AxiosPromise<CourseFullDto> => mainAxios.post(`/courses/`, body);

export const putCourseApi = (
  id: CourseId,
  body: CourseRestDto
): AxiosPromise<CourseFullDto> => mainAxios.put(`/courses/${id}`, body);

export const deleteCourseApi = (id: CourseId): AxiosPromise<void> =>
  mainAxios.delete(`/courses/${id}`);

export const getCoursesByGroupApi = ({
  groupId,
  pagination,
}: GetCoursesByGroupIdRequest): AxiosPromise<Page<CourseDto>> =>
  mainAxios.get(`/courses/group/${groupId}`, {
    params: { ...preparePageRequest(pagination) },
  });
