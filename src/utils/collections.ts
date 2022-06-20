// https://stackoverflow.com/a/70782513/8257924
export const hasDuplicates = (arr: unknown[]) =>
  arr.length !== new Set(arr).size;
