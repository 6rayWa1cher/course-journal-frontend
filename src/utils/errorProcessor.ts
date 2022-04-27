import { EnqueueFunc } from "./hooks/enqueue";

export const defaultErrorEnqueue = <E extends Error>(
  e: E,
  enqueueError: EnqueueFunc
) => {
  if (e.message === "Network Error") {
    enqueueError("Сервер недоступен");
  } else {
    enqueueError("Возникла непредвиденная ошибка");
  }
};
