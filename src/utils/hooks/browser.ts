import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useDocumentTitle = (title: string) => {
  useEffect(() => {
    document.title = (title ? `${title} - ` : '') + 'Журнал предмета';
  }, [title]);
};

export const useNumberSearchState = (
  label: string
): [number | null, (p: number | null) => void] => {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawValue = searchParams.get(label);
  const value =
    rawValue != null && rawValue.length > 0 ? Number(rawValue) : null;
  const setValue = useCallback(
    (p: number | null) => {
      searchParams.set(label, p == null ? '' : p.toString());
      setSearchParams(searchParams);
    },
    [searchParams, label, setSearchParams]
  );
  return [value, setValue];
};
