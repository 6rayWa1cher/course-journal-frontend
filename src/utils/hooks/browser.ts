import { useCallback, useEffect, useMemo } from 'react';
import {
  Params,
  useLocation,
  useParams,
  useSearchParams,
  Location,
} from 'react-router-dom';

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
      setSearchParams(searchParams, { replace: true });
    },
    [searchParams, label, setSearchParams]
  );
  return [value, setValue];
};

// https://stackoverflow.com/a/70754791
const getRoutePath = (location: Location, params: Params): string => {
  const { pathname } = location;

  if (!Object.keys(params).length) {
    return pathname; // we don't need to replace anything
  }

  let path = pathname;
  Object.entries(params).forEach(([paramName, paramValue]) => {
    if (paramValue) {
      path = path.replace(paramValue, `:${paramName}`);
    }
  });
  return path;
};

export const useRoutePath = () => {
  const location = useLocation();
  const params = useParams();
  const pattern = useMemo(
    () => getRoutePath(location, params),
    [location, params]
  );
  return pattern;
};
