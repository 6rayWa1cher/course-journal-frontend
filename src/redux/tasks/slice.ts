import { getAllIdsBy } from '@redux/sliceUtils';
import { createSlice, createEntityAdapter, isAnyOf } from '@reduxjs/toolkit';
import { ShortTaskRestDto, TaskDto } from 'models/task';
import {
  deleteTaskThunk,
  createTaskWithCriteriaThunk,
  putTaskWithCriteriaThunk,
  getTaskByIdThunk,
  createTaskThunk,
  putTaskThunk,
  getTasksByCourseIdThunk,
} from './thunk';

export const adapter = createEntityAdapter<TaskDto | ShortTaskRestDto>();

export const slice = createSlice({
  name: 'tasks',
  initialState: adapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteTaskThunk.fulfilled, (state, { payload }) => {
      adapter.removeOne(state, payload);
    });
    builder.addCase(
      createTaskWithCriteriaThunk.fulfilled,
      (state, { payload }) => {
        adapter.addOne(state, payload.task);
      }
    );
    builder.addCase(
      putTaskWithCriteriaThunk.fulfilled,
      (state, { payload }) => {
        adapter.upsertOne(state, payload.task);
      }
    );
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
      (state, { payload, meta }) => {
        const course = meta.arg.courseId;
        adapter.removeMany(state, getAllIdsBy(state.entities, { course }));
        adapter.upsertMany(state, payload);
      }
    );
  },
});

const reducer = slice.reducer;

export default reducer;
