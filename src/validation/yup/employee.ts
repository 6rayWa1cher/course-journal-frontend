import { FieldValues } from "react-hook-form";
import yup from "./utils";

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
