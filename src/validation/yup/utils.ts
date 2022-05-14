import { parse } from 'date-fns';
import { ru } from 'date-fns/locale';
import * as yup from 'yup';

yup.setLocale({
  mixed: {
    required: 'Это обязательное поле',
  },
  string: {
    min: ({ min }) => `Не менее ${min} символов`,
    max: ({ max }) => `Не более ${max} символов`,
    email: 'Ожидается правильный email',
  },
});

export function transformDate(this: any, value: Date, original: string) {
  if (this.isType(value) && value != null) {
    return value;
  }
  return original
    ? parse(original, 'dd.MM.yyyy HH:mm', new Date(), { locale: ru })
    : undefined;
}

export default yup;
