import { FieldValues } from 'react-hook-form';
import yup from './utils';

const username = yup.string().min(3).max(25).required();

const password = yup.string().min(5).max(128).required();
const confirmPassword = yup
  .string()
  .oneOf([yup.ref('password')], 'Пароли не одинаковы')
  .required();

const privacyPolicyAgreement = yup
  .bool()
  .default(false)
  .oneOf([true], 'Должно быть отмечено');

export const emailPasswordSchema = yup
  .object({
    username,
    password,
  })
  .required();

export interface EmailPasswordSchemaType {
  username: string;
  password: string;
}

export const registrationSchema = emailPasswordSchema
  .shape({
    username,
    password,
    confirmPassword,
    privacyPolicyAgreement,
  })
  .required();

export interface RegistrationSchemaType
  extends FieldValues,
    EmailPasswordSchemaType {
  confirmPassword: string;
  privacyPolicyAgreement: boolean;
}
