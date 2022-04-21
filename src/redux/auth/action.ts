import { createAction } from "@reduxjs/toolkit";
import { AuthBag, authPrefix } from "./types";

export const setBag = createAction<AuthBag>(`${authPrefix}/setBag`);
