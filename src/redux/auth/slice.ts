import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { loadAuthBag, removeAuthBag } from "service/authbag";
import { setBag } from "./action";
import { logoutThunk, loginThunk } from "./thunk";
import { authPrefix, AuthState } from "./types";

const initialState: AuthState = { bag: null, currentRequestId: null };

const slice = createSlice({
  name: authPrefix,
  initialState,
  reducers: {
    loadBag(state) {
      const loaded = loadAuthBag();
      state.bag = loaded;
    },
    eraseBag(state) {
      state.bag = null;
      removeAuthBag();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.bag = null;
    });
    builder.addCase(setBag, (state, { payload }) => {
      state.bag = payload;
    });
    builder.addMatcher(
      isAnyOf(loginThunk.pending, logoutThunk.pending),
      (state, { meta }) => {
        state.currentRequestId ??= meta.requestId;
      }
    );
    builder.addMatcher(
      isAnyOf(
        loginThunk.fulfilled,
        loginThunk.rejected,
        logoutThunk.fulfilled,
        logoutThunk.rejected
      ),
      (state, { meta }) => {
        if (meta.requestId === state.currentRequestId) {
          state.currentRequestId = null;
        }
      }
    );
  },
});

export const { loadBag, eraseBag } = slice.actions;

export default slice.reducer;
