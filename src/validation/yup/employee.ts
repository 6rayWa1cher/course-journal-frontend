import { username, password, EmailPasswordSchemaType } from './user';
import yup from './utils';

const firstName = yup.string().required().max(50);
const lastName = yup.string().required().max(50);
const middleName = yup.string().max(50);
const department = yup.string().max(255);

export interface EmployeeSchemaType {
  firstName: string;
  middleName: string;
  lastName: string;
  department: string;
}

export const employeeSchema = yup
  .object({
    firstName,
    lastName,
    middleName,
    department,
  })
  .required();

export type EmployeeAuthUserType = EmployeeSchemaType & EmailPasswordSchemaType;

export const employeeAuthUserSchema = employeeSchema
  .shape({
    username,
    password,
  })
  .required();

export type EmployeeAuthUserOptionalPasswordType = EmployeeSchemaType &
  EmailPasswordSchemaType;

export const employeeAuthUserOptionalPasswordSchema = employeeSchema
  .shape({
    username,
    password: yup.string().when({
      is: (password: string) => password != null && password.length > 0,
      then: password,
    }),
  })
  .required();
