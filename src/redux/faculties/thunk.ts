import { createAxiosAsyncThunk } from '@redux/utils';
import {
  createFacultyApi,
  deleteFacultyApi,
  getAllFacultiesApi,
  getFacultyByIdApi,
  putFacultyApi,
} from 'api/faculties';
import { FacultyId, FacultyRestDto } from 'models/faculty';

export interface FacultiesGetByIdArgs {
  facultyId: FacultyId;
}

export const getFacultyByIdThunk = createAxiosAsyncThunk(
  'faculties/getById',
  async ({ facultyId }: FacultiesGetByIdArgs) => {
    const data = (await getFacultyByIdApi(facultyId)).data;
    return data;
  }
);

export const getAllFacultiesThunk = createAxiosAsyncThunk(
  'faculties/getAll',
  async () => {
    const data = (await getAllFacultiesApi()).data;
    return data;
  }
);

export const createFacultyThunk = createAxiosAsyncThunk(
  'faculties/create',
  async (args: FacultyRestDto) => {
    const employee = (await createFacultyApi(args)).data;
    return employee;
  }
);

export interface PutFacultyArgs {
  facultyId: FacultyId;
  data: FacultyRestDto;
}

export const putFacultyThunk = createAxiosAsyncThunk(
  'faculties/put',
  async ({ facultyId, data }: PutFacultyArgs) => {
    const employee = (await putFacultyApi(facultyId, data)).data;
    return employee;
  }
);

export type DeleteFacultyArgs = FacultiesGetByIdArgs;

export const deleteFacultyThunk = createAxiosAsyncThunk(
  'faculties/delete',
  async ({ facultyId }: DeleteFacultyArgs) => {
    await deleteFacultyApi(facultyId);
    return facultyId;
  }
);
