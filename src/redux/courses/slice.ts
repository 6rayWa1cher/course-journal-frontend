import { createSlice, createEntityAdapter, isAnyOf } from '@reduxjs/toolkit';
import {
  createCourseThunk,
  deleteCourseThunk,
  getCourseByEmployeePageThunk,
  getCourseByIdThunk,
} from './thunk';
import { CourseDto, CourseFullDto } from 'models/course';
import { getAllStudentsByCourseIdThunk } from '@redux/students';

export const adapter = createEntityAdapter<CourseDto | CourseFullDto>();

export const slice = createSlice({
  name: 'courses',
  initialState: adapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteCourseThunk.fulfilled, (state, { payload }) => {
      adapter.removeOne(state, payload);
    });
    builder.addCase(
      getAllStudentsByCourseIdThunk.fulfilled,
      (state, { payload, meta }) => {
        const course = state.entities[meta.arg.courseId] as
          | CourseFullDto
          | undefined;
        if (course != null) {
          course.students = payload.map((s) => s.id);
        }
      }
    );
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
  },
});

const reducer = slice.reducer;

export default reducer;
