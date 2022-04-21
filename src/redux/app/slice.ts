import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initAppThunk } from "./thunk";
import { appPrefix, AppState, WebApplicationState } from "./types";

const initialState: AppState = {
  state: WebApplicationState.IDLE,
};

const slice = createSlice({
  name: appPrefix,
  initialState,
  reducers: {
    setState(state, payload: PayloadAction<WebApplicationState>) {
      state.state = payload.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initAppThunk.pending, (state, { meta }) => {
      state.state = WebApplicationState.LOADING;
      state.currentRequestId ??= meta.requestId;
    });
    builder.addCase(initAppThunk.fulfilled, (state, { meta }) => {
      if (state.currentRequestId === meta.requestId) {
        state.state = WebApplicationState.RUNNING;
        state.currentRequestId = undefined;
      }
    });
    builder.addCase(initAppThunk.rejected, (state, { payload, meta }) => {
      if (state.currentRequestId === meta.requestId) {
        state.state = WebApplicationState.ERROR;
        state.error = payload;
        state.currentRequestId = undefined;
      }
    });
  },
});

export const { setState } = slice.actions;

export default slice.reducer;
