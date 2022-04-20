import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadAuthBag, removeAuthBag } from "service/authbag";
import { logoutThunk } from "./thunk";
import { AuthBag, authPrefix, AuthState } from "./types";

const initialState: AuthState = { bag: null, username: null };

const slice = createSlice({
  name: authPrefix,
  initialState,
  reducers: {
    setBag(state, { payload }: PayloadAction<AuthBag>) {
      state.bag = payload;
    },
    setUsername(state, { payload }: PayloadAction<string>) {
      state.username = payload;
    },
    loadBag(state) {
      state.bag = loadAuthBag();
    },
    eraseBag(state) {
      state.bag = null;
      removeAuthBag();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutThunk.fulfilled, (state: AuthState) => {
      state.bag = null;
      state.username = null;
    });
  },
});

export const { setBag, setUsername, loadBag, eraseBag } = slice.actions;

export default slice.reducer;
