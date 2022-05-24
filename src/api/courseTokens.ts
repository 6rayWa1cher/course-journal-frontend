import { AxiosPromise } from 'axios';
import { CourseId } from 'models/course';
import {
  CourseTokenDto,
  CourseTokenId,
  CourseTokenRestDto,
} from 'models/courseToken';
import { mainAxios } from './helpers/myaxios';
import { ResolveCourseTokenRequest } from './types';

export const getCourseTokenByCourseIdApi = (
  courseId: CourseId
): AxiosPromise<CourseTokenDto> => mainAxios.get(`/courses/${courseId}/token`);

export const issueCourseTokenApi = (
  data: CourseTokenRestDto
): AxiosPromise<CourseTokenDto> => mainAxios.post(`/courses/tokens`, data);

export const getCourseTokenByIdApi = (
  courseTokenId: CourseTokenId
): AxiosPromise<CourseTokenDto> =>
  mainAxios.get(`/courses/tokens/${courseTokenId}`);

export const deleteCourseTokenApi = (
  courseTokenId: CourseTokenId
): AxiosPromise<void> => mainAxios.delete(`/courses/tokens/${courseTokenId}`);

export const resolveCourseTokenApi = (
  data: ResolveCourseTokenRequest
): AxiosPromise<CourseTokenDto> =>
  mainAxios.post(`/courses/tokens/resolve`, data);
