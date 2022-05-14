import { createSlice, createEntityAdapter, isAnyOf } from '@reduxjs/toolkit';
import { TaskDto } from 'models/task';
import {
  createTaskThunk,
  deleteTaskThunk,
  getTaskByIdThunk,
  getTasksByCourseIdThunk,
  putTaskThunk,
} from './thunk';

export const adapter = createEntityAdapter<TaskDto>();

export const slice = createSlice({
  name: 'tasks',
  initialState: adapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteTaskThunk.fulfilled, (state, { payload }) => {
      adapter.removeOne(state, payload);
    });
    builder.addMatcher(
      isAnyOf(
        getTaskByIdThunk.fulfilled,
        createTaskThunk.fulfilled,
        putTaskThunk.fulfilled
      ),
      (state, { payload }) => {
        adapter.upsertOne(state, payload);
      }
    );
    builder.addMatcher(
      isAnyOf(getTasksByCourseIdThunk.fulfilled),
      (state, { payload }) => {
        adapter.upsertMany(state, payload);
      }
    );
  },
});

const reducer = slice.reducer;

export default reducer;
