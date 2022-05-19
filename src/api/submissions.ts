import { AxiosPromise } from 'axios';
import { CourseId } from 'models/course';
import { StudentId } from 'models/student';
import {
  SubmissionDto,
  SubmissionId,
  SubmissionRestDto,
} from 'models/submission';
import { mainAxios } from './helpers/myaxios';
import { SetSubmissionsForCourseAndStudentRequest } from './types';

export const getSubmissionByIdApi = (
  submissionId: SubmissionId
): AxiosPromise<SubmissionDto> => mainAxios.get(`/submissions/${submissionId}`);

export const getSubmissionsByCourseIdApi = (
  courseId: CourseId
): AxiosPromise<SubmissionDto[]> =>
  mainAxios.get(`/submissions/course/${courseId}`);

export const getSubmissionsByCourseAndStudentApi = (
  courseId: CourseId,
  studentId: StudentId
): AxiosPromise<SubmissionDto[]> =>
  mainAxios.get(`/submissions/course/${courseId}/student/${studentId}`);

export const createSubmissionApi = (
  data: SubmissionRestDto
): AxiosPromise<SubmissionDto> => mainAxios.post('/submissions/', data);

export const putSubmissionApi = (
  submissionId: SubmissionId,
  data: SubmissionRestDto
): AxiosPromise<SubmissionDto> =>
  mainAxios.put(`/submissions/${submissionId}`, data);

export const setSubmissionsForStudentAndCourseApi = ({
  courseId,
  studentId,
  submissions,
}: SetSubmissionsForCourseAndStudentRequest): AxiosPromise<SubmissionDto[]> =>
  mainAxios.post(`/submissions/course/${courseId}/student/${studentId}/set`, {
    submissions,
  });

export const deleteSubmissionApi = (
  submissionId: SubmissionId
): AxiosPromise<void> => mainAxios.delete(`/submissions/${submissionId}`);
