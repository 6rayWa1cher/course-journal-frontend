import yup from './utils';

const name = yup
  .string()
  .matches(/^[^$]{1,150}$/)
  .required();
const criteriaPercent = yup.number().min(0).max(100).required();

export interface CreateCriteriaSchemaType {
  name: string;
  criteriaPercent: number;
}

export const createCriteriaSchema = yup
  .object({
    name,
    criteriaPercent,
  })
  .required();
