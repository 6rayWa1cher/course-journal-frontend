import { getCourseByIdWithItsStudentsThunk } from '@redux/courses';
import { createSlice, createEntityAdapter, isAnyOf } from '@reduxjs/toolkit';
import { StudentDto } from 'models/student';
import {
  batchCreateStudentThunk,
  createStudentThunk,
  deleteStudentThunk,
  getStudentByIdThunk,
  getStudentsByGroupIdThunk,
  getStudentWithAuthUserThunk,
  putStudentThunk,
  putStudentWithAuthUserThunk,
} from './thunk';

export const adapter = createEntityAdapter<StudentDto>();

export const slice = createSlice({
  name: 'students',
  initialState: adapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteStudentThunk.fulfilled, (state, { payload }) => {
      adapter.removeOne(state, payload);
    });
    builder.addMatcher(
      isAnyOf(
        getStudentWithAuthUserThunk.fulfilled,
        putStudentWithAuthUserThunk.fulfilled
      ),
      (state, { payload }) => {
        adapter.upsertOne(state, payload.student);
      }
    );
    builder.addMatcher(
      isAnyOf(
        getStudentByIdThunk.fulfilled,
        createStudentThunk.fulfilled,
        putStudentThunk.fulfilled
      ),
      (state, { payload }) => {
        adapter.upsertOne(state, payload);
      }
    );
    builder.addMatcher(
      isAnyOf(
        getStudentsByGroupIdThunk.fulfilled,
        batchCreateStudentThunk.fulfilled
      ),
      (state, { payload }) => {
        adapter.upsertMany(state, payload);
      }
    );
    builder.addMatcher(
      isAnyOf(getCourseByIdWithItsStudentsThunk.fulfilled),
      (state, { payload }) => {
        const students = payload.students;
        if (students != null) adapter.upsertMany(state, students);
      }
    );
  },
});

const reducer = slice.reducer;

export default reducer;
