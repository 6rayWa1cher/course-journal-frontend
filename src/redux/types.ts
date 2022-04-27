import { AxiosError, AxiosResponse } from "axios";
import store from "./store";

export interface GenericError {
  error: string;
}

export type RootState = ReturnType<typeof store.getState>;

export type Store = typeof store;

export type AppDispatch = typeof store.dispatch;

export type SelectorType<T = any> = (state: RootState, params?: object) => T;

export interface SerializedAxiosError {
  code: AxiosError["code"];
  message: AxiosError["message"];
  stack: AxiosError["stack"];
  response?: Omit<AxiosResponse, "request" | "config">;
}
