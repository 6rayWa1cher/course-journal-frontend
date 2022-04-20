import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initAppThunk } from "./thunk";
import { appPrefix, AppState, WebApplicationState } from "./types";

const initialState: AppState = { state: "idle" };

const slice = createSlice({
  name: appPrefix,
  initialState,
  reducers: {
    setState(state, payload: PayloadAction<WebApplicationState>) {
      state.state = payload.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initAppThunk.pending, (state) => {
      state.state = "loading";
    });
    builder.addCase(initAppThunk.fulfilled, (state) => {
      state.state = "running";
    });
    builder.addCase(initAppThunk.rejected, (state, payload) => {
      state.state = "error";
      state.error = payload.payload;
    });
  },
});

export const { setState } = slice.actions;

export default slice.reducer;
