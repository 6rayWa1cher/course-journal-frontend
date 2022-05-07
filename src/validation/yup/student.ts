import yup from './utils';

const batchFullNames = yup
  .array()
  .transform(function (value: string[][], original: string) {
    if (this.isType(value) && value !== null) {
      return value;
    }
    return original ? original.split('\n').map((l) => l.split(' ')) : [];
  })
  .of(yup.array().min(2).max(3).of(yup.string().max(250)))
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
