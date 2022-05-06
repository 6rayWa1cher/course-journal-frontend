import { AxiosPromise } from 'axios';
import { FacultyDto, FacultyId, FacultyRestDto } from 'models/faculty';
import { mainAxios } from './helpers/myaxios';

export const getFacultyByIdApi = (
  facultyId: FacultyId
): AxiosPromise<FacultyDto> => mainAxios.get(`/faculties/${facultyId}`);

export const getAllFacultiesApi = (): AxiosPromise<FacultyDto[]> =>
  mainAxios.get('/faculties/');

export const createFacultyApi = (
  data: FacultyRestDto
): AxiosPromise<FacultyDto> => mainAxios.post('/faculties/', data);

export const putFacultyApi = (
  facultyId: FacultyId,
  data: FacultyRestDto
): AxiosPromise<FacultyDto> => mainAxios.put(`/faculties/${facultyId}`, data);

export const deleteFacultyApi = (facultyId: FacultyId): AxiosPromise<void> =>
  mainAxios.delete(`/faculties/${facultyId}`);
