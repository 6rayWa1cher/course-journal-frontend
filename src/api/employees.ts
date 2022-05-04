import type { AxiosPromise } from 'axios';
import type { EmployeeDto, EmployeeId } from 'models/employee';
import { mainAxios } from './helpers/myaxios';

export const getEmployeeByIdApi = (id: EmployeeId): AxiosPromise<EmployeeDto> =>
  mainAxios.get(`/employees/${id}`);
