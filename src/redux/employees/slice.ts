import { createSlice, createEntityAdapter, isAnyOf } from '@reduxjs/toolkit';
import {
  createEmployeeThunk,
  deleteEmployeeThunk,
  getEmployeeByIdThunk,
  getEmployeesThunk,
  putEmployeeThunk,
} from './thunk';
import { EmployeeDto } from 'models/employee';

export const adapter = createEntityAdapter<EmployeeDto>();

export const slice = createSlice({
  name: 'employees',
  initialState: adapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEmployeesThunk.fulfilled, (state, { payload }) => {
      adapter.upsertMany(state, payload.content);
    });
    builder.addCase(deleteEmployeeThunk.fulfilled, (state, { payload }) => {
      adapter.removeOne(state, payload);
    });
    builder.addMatcher(
      isAnyOf(
        getEmployeeByIdThunk.fulfilled,
        createEmployeeThunk.fulfilled,
        putEmployeeThunk.fulfilled
      ),
      (state, { payload }) => {
        adapter.upsertOne(state, payload);
      }
    );
  },
});

const reducer = slice.reducer;

export default reducer;
