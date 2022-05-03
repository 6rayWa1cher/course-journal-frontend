export type EmployeeId = number;

export interface EmployeeDto {
  id: EmployeeId;
  firstName: string;
  middleName: string | null;
  lastName: string;
  department: string | null;
  createdAt: string;
  lastModifiedAt: string;
}
