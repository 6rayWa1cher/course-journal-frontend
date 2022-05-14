export type EmployeeId = number;

export interface EmployeeDto {
  id: EmployeeId;
  firstName: string;
  middleName: string | null;
  lastName: string;
  department: string | null;
  hasAuthUser: boolean;
  createdAt: string;
  lastModifiedAt: string;
}

export type EmployeeRestDto = Omit<
  EmployeeDto,
  'id' | 'createdAt' | 'lastModifiedAt' | 'hasAuthUser'
>;
