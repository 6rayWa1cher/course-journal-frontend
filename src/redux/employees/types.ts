import type { EmployeeDto, EmployeeId } from "models/employee";

export interface EmployeeState {
  entities: Record<EmployeeId, EmployeeDto>;
  ids: EmployeeId[];
}
