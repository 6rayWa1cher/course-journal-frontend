import { SerializedError } from "@reduxjs/toolkit";

export type WebApplicationState = "idle" | "loading" | "running" | "error";

export interface AppState {
  state: WebApplicationState;
  error?: SerializedError;
}

export const appPrefix = "app";

export enum Stage {
  UNAUTHORIZED = "UNAUTHORIZED",
  AUTHORIZED = "AUTHORIZED",
}
