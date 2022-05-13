import { createCriteriaSchema, CreateCriteriaSchemaType } from './criteria';
import yup from './utils';

const title = yup.string().min(1).max(250).required();
const description = yup.string().max(25000);
const maxScore = yup.number().when({
  is: (score?: string) => score != null && score.length > 0,
  then: (schema) => schema.min(0),
});
const criteria = yup.array().of(createCriteriaSchema).min(1).required();
const announced = yup.bool().required();
const deadlinesEnabled = yup.bool().required();
const maxPenaltyPercent = yup.number().when('deadlinesEnabled', {
  is: true,
  then: (schema) => schema.min(0).max(100),
});
const softDeadlineAt = yup.date().when('deadlinesEnabled', {
  is: true,
  then: (schema) => schema.required(),
});
const hardDeadlineAt = yup.date().when('deadlinesEnabled', {
  is: true,
  then: (schema) =>
    schema
      .required()
      .max(
        yup.ref('softDeadlineAt'),
        'Жесткий крайний срок должен быть позже мягкого'
      ),
});

export interface CreateTaskSchemaType {
  title: string;
  description: string;
  maxScore: string;
  criteria: (CreateCriteriaSchemaType & { id: string })[];
  announced: boolean;
  deadlinesEnabled: boolean;
  maxPenaltyPercent: string;
  softDeadlineAt: Date | null;
  hardDeadlineAt: Date | null;
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
