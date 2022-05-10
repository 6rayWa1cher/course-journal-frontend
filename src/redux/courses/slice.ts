import { createSlice, createEntityAdapter, isAnyOf } from '@reduxjs/toolkit';
import { getCourseByEmployeePageThunk } from './thunk';
import { CourseDto } from 'models/course';

export const adapter = createEntityAdapter<CourseDto>();

export const slice = createSlice({
  name: 'courses',
  initialState: adapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(getCourseByEmployeePageThunk.fulfilled),
      (state, { payload }) => {
        adapter.upsertMany(state, payload.content);
      }
    );
  },
});

const reducer = slice.reducer;

export default reducer;
