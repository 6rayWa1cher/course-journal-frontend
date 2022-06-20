import { CourseId } from 'models/course';
import { CriteriaId } from 'models/criteria';
import { StudentId } from 'models/student';
import { TaskId } from 'models/task';
import yup, { transformDate } from './utils';

const submittedAt = yup.date().transform(transformDate).required();
const satisfiedCriteria = yup.array().of(yup.number().required()).required();
const additionalScore = yup.number().required();

export interface BatchSetSubmissionsSchemaType {
  courseId: CourseId;
  studentId: StudentId;
  submissions: {
    task: TaskId;
    submittedAt: Date;
    satisfiedCriteria: CriteriaId[];
    additionalScore: number;
  }[];
}

export const batchSetSubmissionsSchema = yup
  .object({
    courseId: yup.number().required(),
    studentId: yup.number().required(),
    submissions: yup
      .array()
      .of(
        yup
          .object({
            task: yup.number().required(),
            satisfiedCriteria,
            submittedAt,
            additionalScore,
          })
          .required()
      )
      .required(),
  })
  .required();
