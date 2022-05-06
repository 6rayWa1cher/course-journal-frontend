import { FacultyRestDto } from 'models/faculty';
import yup from './utils';

const name = yup.string().max(255).required();

export type FacultySchemaType = FacultyRestDto;

export const facultySchema = yup
  .object({
    name,
  })
  .required();
