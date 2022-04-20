import store from "./store";

export interface GenericError {
  error: string;
}

export type RootState = ReturnType<typeof store.getState>;

export type Store = typeof store;

export type AppDispatch = typeof store.dispatch;

export type SelectorType<T = any> = (state: RootState, params?: object) => T;
