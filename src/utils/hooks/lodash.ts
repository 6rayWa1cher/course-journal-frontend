import { debounce } from 'lodash';
import { useMemo } from 'react';

export const useDebounce = <Args extends any[], Return>(
  func: (...args: Args) => Return,
  delay: number
) => useMemo(() => debounce(func, delay), [func, delay]);
