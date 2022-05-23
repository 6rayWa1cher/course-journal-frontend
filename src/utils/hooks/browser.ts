import {
  ContextType,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import {
  Params,
  useLocation,
  useParams,
  useSearchParams,
  Location,
  Navigator as BaseNavigator,
  UNSAFE_NavigationContext as NavigationContext,
} from 'react-router-dom';
import type { Blocker, History, Transition } from 'history';

export const useDocumentTitle = (title: string) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = (title ? `${title} - ` : '') + 'Журнал курса';
    return () => {
      document.title = prevTitle;
    };
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

export const useStringSearchState = (
  label: string
): [string | null, (p: string | null) => void] => {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawValue = searchParams.get(label);
  const value = rawValue != null && rawValue.length > 0 ? rawValue : null;
  const setValue = useCallback(
    (p: string | null) => {
      searchParams.set(label, p == null ? '' : p);
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

interface Navigator extends BaseNavigator {
  block: History['block'];
}

type NavigationContextWithBlock = ContextType<typeof NavigationContext> & {
  navigator: Navigator;
};

/**
 * @source https://github.com/remix-run/react-router/commit/256cad70d3fd4500b1abcfea66f3ee622fb90874
 */
export function useBlocker(blocker: Blocker, when = true) {
  const { navigator } = useContext(
    NavigationContext
  ) as NavigationContextWithBlock;

  useEffect(() => {
    if (!when) {
      return;
    }

    const unblock = navigator.block((tx: Transition) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          // Automatically unblock the transition so it can play all the way
          // through before retrying it. TODO: Figure out how to re-enable
          // this block if the transition is cancelled for some reason.
          unblock();
          tx.retry();
        },
      };

      blocker(autoUnblockingTx);
    });

    return unblock;
  }, [navigator, blocker, when]);
}

/**
 * @source https://github.com/remix-run/react-router/issues/8139#issuecomment-1021457943
 */
export function usePrompt(
  message:
    | string
    | ((
        location: Transition['location'],
        action: Transition['action']
      ) => string),
  when = true
) {
  const blocker = useCallback(
    (tx: Transition) => {
      let response;
      if (typeof message === 'function') {
        response = message(tx.location, tx.action);
        if (typeof response === 'string') {
          response = window.confirm(response);
        }
      } else {
        response = window.confirm(message);
      }
      if (response) {
        tx.retry();
      }
    },
    [message]
  );
  return useBlocker(blocker, when);
}

export const useBackLocation = () => {
  const location = useLocation();
  return useMemo(() => {
    const pathname = location.pathname.endsWith('/')
      ? location.pathname.substring(0, location.pathname.length - 2)
      : location.pathname;
    return pathname.substring(0, pathname.lastIndexOf('/'));
  }, [location.pathname]);
};
