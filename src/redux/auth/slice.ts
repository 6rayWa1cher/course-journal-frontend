import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { loadAuthBag, removeAuthBag } from 'service/authbag';
import { setBag } from './action';
import { logoutThunk, loginThunk } from './thunk';
import { AuthState } from './types';

const initialState: AuthState = {
  bag: null,
  courseToken: null,
  currentRequestId: null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loadBag(state) {
      const loaded = loadAuthBag();
      state.bag = loaded;
      state.courseToken = null;
    },
    setCourseToken(state, { payload }: { payload: string }) {
      state.courseToken = payload;
      state.bag = null;
    },
    eraseBag(state) {
      state.bag = null;
      state.courseToken = null;
      removeAuthBag();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.bag = null;
      state.courseToken = null;
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

export const { loadBag, eraseBag, setCourseToken } = slice.actions;

export default slice.reducer;
