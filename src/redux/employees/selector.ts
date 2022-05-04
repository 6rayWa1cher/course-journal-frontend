import type { RootState } from "@redux/types";
import { createSelector } from "@reduxjs/toolkit";
import { EmployeeDto, EmployeeId } from "models/employee";

const employeesSelector = (state: RootState) => state.employees;

const employeeIdFromParamsSelector = (
  _: any,
  { employeeId }: { employeeId: EmployeeId }
) => employeeId;
const employeeIdsFromParamsSelector = (
  _: any,
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
