import { FieldValues } from 'react-hook-form';
import yup from './utils';

export const username = yup
  .string()
  .min(5)
  .max(25)
  .matches(/^[a-zA-Z0-9.]{5,25}$/, 'Может содержать только a-z, A-Z, 0-9 и .')
  .required();

export const password = yup.string().min(5).max(128);

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
