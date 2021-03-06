const isLetter = (c: string) =>
  c.toLowerCase() !== c.toUpperCase() ||
  (c.length > 0 && (c.codePointAt(0) as number) > 127);

export const getFirstCapitalSymbols = (str: string, n = 3) =>
  str
    .split('')
    .map((c) => (isLetter(c) ? c : ' '))
    .join('')
    .split(' ')
    .filter((s) => s !== '')
    .map((s) => s[0].toUpperCase())
    .slice(0, n)
    .join('');

export const getFirstLetter = (str: string) => str.charAt(0);

export interface FullName {
  firstName: string;
  middleName?: Nullable<string>;
  lastName: string;
}

export const formatFullNameWithInitials = ({
  firstName,
  lastName,
  middleName,
}: FullName & object) =>
  middleName != null && middleName.length > 0
    ? `${lastName} ${getFirstLetter(firstName)}.${getFirstLetter(middleName)}.`
    : `${lastName} ${getFirstLetter(firstName)}.`;

export const getFullName = ({
  firstName,
  lastName,
  middleName,
}: FullName & object) =>
  middleName != null
    ? `${lastName} ${firstName} ${middleName}`
    : `${lastName} ${firstName}`;

export const dateToLocalDateString = (date: Date) => {
  console.log(date.getDate);
};
