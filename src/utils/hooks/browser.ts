import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const useQueryParams = () => {
  const { search } = useLocation();
  return useMemo(
    () => Object.fromEntries(new URLSearchParams(search).entries()),
    [search]
  );
};

const nullSafeParseInt = (value?: string): Nullable<number> =>
  value != null ? +value : value;

export const useNumberParams = (): Nullable<Record<string, number>> => {
  const params = useParams();
  return (
    params &&
    Object.keys(params).reduce(
      (acc, c) => ({ ...acc, [c]: nullSafeParseInt(params[c]) }),
      {}
    )
  );
};

export const useDocumentTitle = (title: string) => {
  useEffect(() => {
    document.title = (title ? `${title} - ` : "") + "XyDx Product";
  }, [title]);
};
