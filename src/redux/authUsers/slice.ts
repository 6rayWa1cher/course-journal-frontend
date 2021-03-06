import {
  createEmployeeWithAuthUserThunk,
  getEmployeeWithAuthUserThunk,
  putEmployeeWithAuthUserThunk,
} from '@redux/employees/thunk';
import {
  getStudentWithAuthUserThunk,
  putStudentWithAuthUserThunk,
} from '@redux/students/thunk';
import { createSlice, createEntityAdapter, isAnyOf } from '@reduxjs/toolkit';
import { AuthUserDto } from 'models/authUser';
import {
  createAuthUserThunk,
  getAuthUserByEmployeeIdThunk,
  getAuthUserByIdThunk,
  getAuthUserByStudentIdThunk,
  patchAuthUserThunk,
} from './thunk';

export const adapter = createEntityAdapter<AuthUserDto>();

export const slice = createSlice({
  name: 'authUsers',
  initialState: adapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(
        getStudentWithAuthUserThunk.fulfilled,
        createEmployeeWithAuthUserThunk.fulfilled,
        getEmployeeWithAuthUserThunk.fulfilled,
        putEmployeeWithAuthUserThunk.fulfilled,
        putStudentWithAuthUserThunk.fulfilled
      ),
      (state, { payload }) => {
        const authUser = payload.authUser;
        if (authUser != null) adapter.upsertOne(state, authUser);
      }
    );
    builder.addMatcher(
      isAnyOf(
        getAuthUserByIdThunk.fulfilled,
        getAuthUserByEmployeeIdThunk.fulfilled,
        createAuthUserThunk.fulfilled,
        patchAuthUserThunk.fulfilled,
        getAuthUserByStudentIdThunk.fulfilled
      ),
      (state, { payload }) => {
        adapter.upsertOne(state, payload);
      }
    );
  },
});

const reducer = slice.reducer;

export default reducer;
