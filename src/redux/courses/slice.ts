import { createSlice, createEntityAdapter, isAnyOf } from '@reduxjs/toolkit';
import { getSelfCoursesPageThunk } from './thunk';
import { CourseDto } from 'models/course';

export const adapter = createEntityAdapter<CourseDto>();

export const slice = createSlice({
  name: 'courses',
  initialState: adapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(getSelfCoursesPageThunk.fulfilled),
      (state, { payload }) => {
        adapter.upsertMany(state, payload.content);
      }
    );
  },
});

const reducer = slice.reducer;

export default reducer;
