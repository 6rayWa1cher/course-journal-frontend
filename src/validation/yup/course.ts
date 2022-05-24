import { CourseId } from 'models/course';
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

export interface EditCourseSchemaType extends CreateCourseSchemaType {
  courseId: CourseId;
}

export const editCourseSchema = createCourseSchema
  .shape({
    courseId: yup.number().required(),
  })
  .required();
