// https://stackoverflow.com/a/70782513/8257924
export const hasDuplicates = (arr: unknown[]) =>
  arr.length !== new Set(arr).size;

export const isArrayOfNumbersContainsElementFromOtherArray = (
  array1: number[],
  array2: number[]
) => {
  const set2 = new Set(array2);
  const intersection = new Set(array1.filter((x) => set2.has(x)));
  return intersection.size !== 0;
};
