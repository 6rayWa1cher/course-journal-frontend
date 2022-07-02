/* eslint-disable import/no-duplicates */
import { format, parse } from 'date-fns';
import ru from 'date-fns/locale/ru';

export const formatRuDateTime = (dateString: string) =>
  format(new Date(dateString), 'dd.MM.yyyy HH:mm', {
    locale: ru,
  });

export const parseRuDateTime = (dateString: string) =>
  parse(dateString, 'dd.MM.yyyy HH:mm', new Date(), { locale: ru });

export const getFirstSeptemberDate = (date: Date): Date => {
  return new Date(
    date.getMonth() > 8 ? date.getFullYear() : date.getFullYear() - 1,
    8,
    1
  );
};

export const getClassNumberByTime = (
  hours: number,
  minutes: number
): number => {
  const classStarts = [
    [8, 30],
    [10, 15],
    [12, 10],
    [14, 0],
    [15, 50],
    [17, 40],
    [19, 30],
  ];
  if (
    hours < classStarts[0][0] ||
    (hours < classStarts[1][0] && minutes < classStarts[1][1])
  ) {
    return 1;
  } else if (hours < classStarts[2][0] && minutes < classStarts[2][1]) {
    return 2;
  } else if (hours < classStarts[3][0] && minutes < classStarts[3][1]) {
    return 3;
  } else if (hours < classStarts[4][0] && minutes < classStarts[4][1]) {
    return 5;
  } else if (hours < classStarts[5][0] && minutes < classStarts[5][1]) {
    return 6;
  } else {
    return 7;
  }
};
