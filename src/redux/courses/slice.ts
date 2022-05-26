import { createSlice, createEntityAdapter, isAnyOf } from '@reduxjs/toolkit';
import {
  createCourseThunk,
  deleteCourseThunk,
  getCourseByEmployeePageThunk,
  getCourseByIdThunk,
  getCourseByIdWithItsStudentsThunk,
} from './thunk';
import { CourseDto, CourseFullDto } from 'models/course';

export const adapter = createEntityAdapter<CourseDto | CourseFullDto>();

export const slice = createSlice({
  name: 'courses',
  initialState: adapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteCourseThunk.fulfilled, (state, { payload }) => {
      adapter.removeOne(state, payload);
    });
    builder.addMatcher(
      isAnyOf(getCourseByEmployeePageThunk.fulfilled),
      (state, { payload }) => {
        adapter.upsertMany(state, payload.content);
      }
    );
    builder.addMatcher(
      isAnyOf(createCourseThunk.fulfilled, getCourseByIdThunk.fulfilled),
      (state, { payload }) => {
        adapter.upsertOne(state, payload);
      }
    );
    builder.addMatcher(
      isAnyOf(getCourseByIdWithItsStudentsThunk.fulfilled),
      (state, { payload }) => {
        adapter.upsertOne(state, payload.course);
      }
    );
  },
});

const reducer = slice.reducer;

export default reducer;
