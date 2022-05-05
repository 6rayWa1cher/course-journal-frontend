import type { AxiosPromise } from 'axios';
import type { EmployeeData, EmployeeDto, EmployeeId } from 'models/employee';
import { mainAxios } from './helpers/myaxios';
import { preparePageRequest } from './helpers/preparers';
import { GetEmployeesRequest, Page, PutEmployeeRequest } from './types';

export const getEmployeesApi = (
  pageable: GetEmployeesRequest
): AxiosPromise<Page<EmployeeDto>> =>
  mainAxios.get('/employees/', { params: preparePageRequest(pageable) });

export const getEmployeeByIdApi = (id: EmployeeId): AxiosPromise<EmployeeDto> =>
  mainAxios.get(`/employees/${id}`);

export const createEmployeeApi = (
  data: EmployeeData
): AxiosPromise<EmployeeDto> => mainAxios.post(`/employees/`, data);

export const putEmployeeApi = (
  id: EmployeeId,
  data: PutEmployeeRequest
): AxiosPromise<EmployeeDto> => mainAxios.put(`/employees/${id}`, data);

export const deleteEmployeeApi = (id: EmployeeId): AxiosPromise<void> =>
  mainAxios.delete(`/employees/${id}`);
