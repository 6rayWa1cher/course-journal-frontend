import yup from './utils';

const groupName = yup.string().max(255).required();

export interface GroupSchemaType {
  name: string;
}

export const groupSchema = yup
  .object({
    name: groupName,
  })
  .required();
