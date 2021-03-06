import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import store from './store';

export interface GenericError {
  error: string;
}

export type RootState = ReturnType<typeof store.getState>;

export type Store = typeof store;

export type AppDispatch = typeof store.dispatch;

export type SelectorType<T, J = void> = (state: RootState, params: J) => T;

export interface SerializedAxiosError extends Error {
  code: AxiosError['code'];
  message: AxiosError['message'];
  stack: AxiosError['stack'];
  response?: Omit<AxiosResponse, 'request' | 'config'>;
  config: Pick<AxiosRequestConfig, 'url'>;
}
