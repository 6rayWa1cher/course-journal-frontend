import { CriteriaId } from 'models/criteria';
import yup from './utils';

const name = yup.string().min(1).max(250).required();
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

// export interface EditCriteriaSchemaType {
//   id?: CriteriaId;
//   name: string;
//   criteriaPercent: number;
// }

// export const editCriteriaSchema = createCriteriaSchema.shape({
//   id: yup.number(),
// });
