import { createSlice, createEntityAdapter, isAnyOf } from "@reduxjs/toolkit";
import { getEmployeeByIdThunk, geеEmployeesThunk } from "./thunk";
import { EmployeeDto } from "models/employee";

export const adapter = createEntityAdapter<EmployeeDto>();

export const slice = createSlice({
  name: 'employees',
  initialState: adapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(geеEmployeesThunk.fulfilled, (state, { payload }) => {
      adapter.upsertMany(state, payload.content);
    });
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
