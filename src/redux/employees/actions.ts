import { createAction } from '@reduxjs/toolkit';
import { EmployeeDto } from 'models/employee';

export const upsertOneEmployee = createAction<EmployeeDto>(
  'employees/upsertOne'
);
