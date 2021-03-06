import { AxiosPromise } from 'axios';
import { CourseId } from 'models/course';
import { GroupId } from 'models/group';
import { StudentDto, StudentId, StudentRestDto } from 'models/student';
import { mainAxios } from './helpers/myaxios';
import { BatchCreateStudentRequest } from './types';

export const getStudentByIdApi = (
  studentId: StudentId
): AxiosPromise<StudentDto> => mainAxios.get(`/students/${studentId}`);

export const getStudentsByGroupIdApi = (
  groupId: GroupId
): AxiosPromise<StudentDto[]> => mainAxios.get(`/students/group/${groupId}`);

export const getAllStudentsByCourseIdApi = (
  courseId: CourseId
): AxiosPromise<StudentDto[]> =>
  mainAxios.get(`/students/course/${courseId}/all`);

export const createStudentApi = (
  data: StudentRestDto
): AxiosPromise<StudentDto> => mainAxios.post('/students/', data);

export const batchCreateStudentApi = (
  data: BatchCreateStudentRequest
): AxiosPromise<StudentDto[]> => mainAxios.post('/students/batch', data);

export const putStudentApi = (
  studentId: StudentId,
  data: StudentRestDto
): AxiosPromise<StudentDto> => mainAxios.put(`/students/${studentId}`, data);

export const deleteStudentApi = (studentId: StudentId): AxiosPromise<void> =>
  mainAxios.delete(`/students/${studentId}`);
