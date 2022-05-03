import { SerializedError } from "@reduxjs/toolkit";

export enum WebApplicationState {
  IDLE = "idle",
  LOADING = "loading",
  RUNNING = "running",
  ERROR = "error",
}

export interface AppState {
  state: WebApplicationState;
  error?: SerializedError;
  currentRequestId?: string;
}

export enum Stage {
  UNAUTHORIZED = "UNAUTHORIZED",
  AUTHORIZED = "AUTHORIZED",
}
