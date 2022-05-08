import { password, username } from './user';
import yup from './utils';

const name = yup.string().max(250);

const batchFullNames = yup
  .array()
  .transform(function (value: string[][], original: string) {
    if (this.isType(value) && value !== null) {
      return value;
    }
    return original ? original.split('\n').map((l) => l.split(' ')) : [];
  })
  .of(yup.array().min(2).max(3).of(name))
  .min(1, 'Нужно ввести хотя-бы одно ФИО');

export interface BatchFullNamesSchemaType {
  batchFullNames: string;
}

export interface BatchFullNamesTransformedSchemaType {
  batchFullNames: [string, string, string | undefined][];
}

export const batchFullNamesSchema = yup
  .object({
    batchFullNames,
  })
  .required();

export interface StudentFullSchemaType {
  lastName: string;
  firstName: string;
  middleName: string;
  headman: boolean;
  username: string;
  password: string;
}

export const studentFullSchema = yup.object({
  lastName: name.required(),
  firstName: name.required(),
  middleName: name,
  headman: yup.bool(),
  username: yup.string().when('headman', {
    is: true,
    then: (schema) => schema.concat(username),
  }),
  password: yup.string().when(['headman', '$authUserExists'], {
    is: (headman: boolean, authUserExists: boolean) =>
      headman && !authUserExists,
    then: password.required(),
    otherwise: (schema) =>
      schema.test({
        name: 'emptyOrValid',
        message: '',
        test: (pwd) => {
          try {
            return (
              pwd == null ||
              pwd.length === 0 ||
              password.validateSync(pwd) != null
            );
          } catch (e) {
            return false;
          }
        },
      }),
  }),
});
