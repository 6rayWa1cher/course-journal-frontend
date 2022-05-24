/* eslint-disable import/no-duplicates */
import { format, parse } from 'date-fns';
import ru from 'date-fns/locale/ru';

export const formatRuDateTime = (dateString: string) =>
  format(new Date(dateString), 'dd.MM.yyyy HH:mm', {
    locale: ru,
  });

export const parseRuDateTime = (dateString: string) =>
  parse(dateString, 'dd.MM.yyyy HH:mm', new Date(), { locale: ru });
