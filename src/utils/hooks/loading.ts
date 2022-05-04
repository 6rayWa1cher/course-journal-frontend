import { useCallback, useEffect, useState } from 'react';
import { useMySnackbar } from './enqueue';

export enum UseLoadingEnum {
  IDLE,
  PENDING,
  SUCCESS,
  ERROR,
}

export type UseLoadingOptions = Partial<{
  immediate: boolean;
  enqueue: boolean;
  errorToMsg: ((error: Error) => string) | string | null;
}>;

export const useLoadingPlain = (
  asyncFunc: () => Promise<any>,
  {
    immediate = true,
    enqueue = false,
    errorToMsg = null,
  }: UseLoadingOptions = {}
) => {
  const [status, setStatus] = useState(UseLoadingEnum.IDLE);
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);

  const { enqueueError } = useMySnackbar();

  // The execute function wraps asyncFunction and
  // handles setting state for pending, value, and error.
  // useCallback ensures the below useEffect is not called
  // on every render, but only if asyncFunction changes.
  const execute = useCallback(() => {
    setStatus(UseLoadingEnum.PENDING);
    setValue(null);
    setError(null);

    if (asyncFunc) {
      return asyncFunc()
        .then((response) => {
          setValue(response);
          setStatus(UseLoadingEnum.SUCCESS);
        })
        .catch((error) => {
          const msg = errorToMsg
            ? errorToMsg instanceof Function
              ? errorToMsg(error)
              : errorToMsg
            : error;
          setError(msg);
          setStatus(UseLoadingEnum.ERROR);
          if (enqueue) {
            enqueueError(msg);
          }
        });
    }
  }, [asyncFunc, enqueueError, errorToMsg, enqueue]);

  // Call execute if we want to fire it right away.
  // Otherwise execute can be called later, such as
  // in an onClick handler.
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  const loading = status === UseLoadingEnum.PENDING;
  const idle = status === UseLoadingEnum.IDLE;

  return {
    execute,
    status,
    value,
    error,
    loading,
    idle,
    bundle: { loading, error, status },
  };
};
