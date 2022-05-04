import { createSlice, createEntityAdapter, isAnyOf } from '@reduxjs/toolkit';
import { AuthUserDto } from 'models/authUser';
import { getAuthUserByIdThunk } from './thunk';

export const adapter = createEntityAdapter<AuthUserDto>();

export const slice = createSlice({
  name: 'authUsers',
  initialState: adapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(getAuthUserByIdThunk.fulfilled),
      (state, { payload }) => {
        adapter.upsertOne(state, payload);
      }
    );
  },
});

const reducer = slice.reducer;

export default reducer;
