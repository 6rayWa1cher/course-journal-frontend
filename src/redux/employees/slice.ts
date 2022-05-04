import { createSlice, createEntityAdapter, isAnyOf } from '@reduxjs/toolkit';
import { getEmployeeByIdThunk } from './thunk';
import { EmployeeDto } from 'models/employee';

export const adapter = createEntityAdapter<EmployeeDto>();

export const slice = createSlice({
  name: 'employees',
  initialState: adapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(getEmployeeByIdThunk.fulfilled),
      (state, { payload }) => {
        adapter.upsertOne(state, payload);
      }
    );
  },
});

const reducer = slice.reducer;

export default reducer;
