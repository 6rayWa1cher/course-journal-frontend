import yup from './utils';

const date = yup.string().required();
const classNumber = yup.number().required();

export interface CreateDateClassNumberAttendance {
  date: string;
  classNumber: number;
}

export const createDateClassNumberAttendance = yup.object({
  date,
  classNumber,
});
