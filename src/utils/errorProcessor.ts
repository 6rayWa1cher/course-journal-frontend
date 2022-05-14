import { EnqueueFunc } from './hooks/enqueue';

export const defaultErrorEnqueue = <E extends Error>(
  e: E,
  enqueueError: EnqueueFunc
) => {
  if (e.message === 'Network Error') {
    enqueueError('Сервер недоступен');
  } else {
    console.error(e);
    enqueueError('Возникла непредвиденная ошибка');
  }
};
