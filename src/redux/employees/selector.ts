import type { RootState } from '@redux/types';
import { createSelector } from '@reduxjs/toolkit';
import { EmployeeId } from 'models/employee';
import { formatFullNameWithInitials } from 'utils/string';

export const employeesSelector = (state: RootState) => state.employees;

export const employeeIdFromParamsSelector = (
  _: unknown,
  { employeeId }: { employeeId?: EmployeeId }
) => employeeId ?? -1;

export const employeeIdsFromParamsSelector = (
  _: unknown,
  { ids }: { ids: EmployeeId[] }
) => ids;

export const employeeByIdSelector = createSelector(
  employeesSelector,
  employeeIdFromParamsSelector,
  (state, employeeId) => state.entities[employeeId]
);

export const employeeByIdsSelector = createSelector(
  employeesSelector,
  employeeIdsFromParamsSelector,
  (state, ids) => ids.map((id) => state.entities[id])
);

export const employeeInitialsByIdSelector = createSelector(
  employeeByIdSelector,
  (employee) => (employee != null ? formatFullNameWithInitials(employee) : null)
);
