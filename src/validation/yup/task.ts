import { CourseId } from 'models/course';
import { hasDuplicates } from 'utils/collections';
import { createCriteriaSchema, CreateCriteriaSchemaType } from './criteria';
import yup, { transformDate } from './utils';

const title = yup.string().min(1).max(250).required();
const description = yup.string().max(25000);
const maxScore = yup.number().required().min(0);
const criteria = yup
  .array()
  .of(createCriteriaSchema)
  .min(1)
  .required()
  .test(
    'criteria-unique-names',
    'Все названия критериев должны быть уникальны',
    (value) => value == null || !hasDuplicates(value.map((c) => c.name))
  );
const announced = yup.bool().required();
const deadlinesEnabled = yup.bool().required();
const maxPenaltyPercent = yup.number().when('deadlinesEnabled', {
  is: true,
  then: (schema) => schema.required().min(0).max(100),
});
const softDeadlineAt = yup
  .date()
  .transform(transformDate)
  .when('deadlinesEnabled', {
    is: true,
    then: (schema) => schema.required(),
  });
const hardDeadlineAt = yup
  .date()
  .transform(transformDate)
  .when('deadlinesEnabled', {
    is: true,
    then: (schema) =>
      schema
        .required()
        .min(
          yup.ref('softDeadlineAt'),
          'Жесткий крайний срок должен быть позже мягкого'
        ),
  });

export interface CreateTaskSchemaType {
  title: string;
  description?: string;
  maxScore?: number;
  criteria: CreateCriteriaSchemaType[];
  announced: boolean;
  deadlinesEnabled: boolean;
  maxPenaltyPercent?: number;
  softDeadlineAt?: Date;
  hardDeadlineAt?: Date;
}

export const createTaskSchema = yup
  .object({
    title,
    description,
    maxScore,
    criteria,
    announced,
    deadlinesEnabled,
    maxPenaltyPercent,
    softDeadlineAt,
    hardDeadlineAt,
  })
  .required();

export interface EditTaskSchemaType extends CreateTaskSchemaType {
  course: CourseId;
  taskNumber: number;
}

export const editTaskSchema = createTaskSchema.shape({
  taskNumber: yup.number().required(),
  course: yup.number().required(),
});
