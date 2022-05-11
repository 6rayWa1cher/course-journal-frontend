import { StudentId } from 'models/student';
import yup from './utils';

const name = yup.string().min(1).max(250).required();
const students = yup.array().of(yup.number().required()).required();

export interface CreateCourseSchemaType {
  name: string;
  students: StudentId[];
}

export const createCourseSchema = yup
  .object({
    name,
    students,
  })
  .required();
