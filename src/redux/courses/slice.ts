import { createSlice, createEntityAdapter, isAnyOf } from '@reduxjs/toolkit';
import {
  createCourseThunk,
  deleteCourseThunk,
  getCourseByEmployeePageThunk,
  getCourseByGroupPageThunk,
  getCourseByIdThunk,
  getCourseByIdWithItsStudentsThunk,
} from './thunk';
import { CourseDto, CourseFullDto } from 'models/course';
import { getAllStudentsByCourseIdThunk } from '@redux/students/thunk';
import { getAllIdsBy } from '@redux/sliceUtils';
import { resolveCourseTokenThunk } from '@redux/courseTokens/thunk';
import { CourseState } from './types';
import { initAppThunk } from '@redux/app/thunk';

export const adapter = createEntityAdapter<CourseDto | CourseFullDto>();

const initialState: CourseState = {
  ...adapter.getInitialState(),
  resolved: undefined,
};

export const slice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initAppThunk.pending, (state) => {
      state.resolved = undefined;
    });
    builder.addCase(resolveCourseTokenThunk.fulfilled, (state, { payload }) => {
      state.resolved = payload.id;
    });
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
      (state, { payload, meta }) => {
        const owner = meta.arg.employeeId;
        adapter.removeMany(state, getAllIdsBy(state.entities, { owner }));
        adapter.upsertMany(state, payload.content);
      }
    );
    builder.addMatcher(
      isAnyOf(getCourseByGroupPageThunk.fulfilled),
      (state, { payload }) => {
        const owner = payload.content[0].owner;
        adapter.removeMany(state, getAllIdsBy(state.entities, { owner }));
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
