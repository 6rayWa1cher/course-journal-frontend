import BigProcess from 'components/BigProcess';
import NotFound from 'components/NotFound';
import React, { useMemo } from 'react';
import { useLoadingPlain } from 'utils/hooks';

export interface PreLoadingProps<Returned> {
  action: () => Promise<Returned | null | undefined | void>;
  render?: (value: Returned) => React.ReactElement;
  onNotFound?: React.ReactElement;
  onLoading?: React.ReactElement;
  children?: Children;
}

const PreLoading = <Returned,>({
  action,
  render,
  children,
  onNotFound,
  onLoading,
}: PreLoadingProps<Returned>): React.ReactElement => {
  const { loading, value } = useLoadingPlain(action);

  const contentFromRender = useMemo(
    () =>
      value == null ? (
        <React.Fragment />
      ) : render != null ? (
        render(value)
      ) : null,
    [render, value]
  );

  if (loading) {
    return <>{onLoading ?? <BigProcess />}</>;
  }
  if (value == null) {
    return <>{onNotFound ?? <NotFound />}</>;
  }

  return contentFromRender ?? <>{children}</>;
};

export default PreLoading;
