import { createSlice, createEntityAdapter, isAnyOf } from '@reduxjs/toolkit';
import { SubmissionDto } from 'models/submission';
import {
  createSubmissionThunk,
  deleteSubmissionThunk,
  getSubmissionByIdThunk,
  getSubmissionsByCourseAndStudentThunk,
  getSubmissionsByCourseIdThunk,
  putSubmissionThunk,
  setSubmissionsForStudentAndCourseThunk,
} from './thunk';

export const adapter = createEntityAdapter<SubmissionDto>();

export const slice = createSlice({
  name: 'submissions',
  initialState: adapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteSubmissionThunk.fulfilled, (state, { payload }) => {
      adapter.removeOne(state, payload);
    });
    builder.addMatcher(
      isAnyOf(
        getSubmissionsByCourseIdThunk.fulfilled,
        getSubmissionsByCourseAndStudentThunk.fulfilled,
        setSubmissionsForStudentAndCourseThunk.fulfilled
      ),
      (state, { payload }) => {
        adapter.setAll(state, payload);
      }
    );
    builder.addMatcher(
      isAnyOf(
        getSubmissionByIdThunk.fulfilled,
        createSubmissionThunk.fulfilled,
        putSubmissionThunk.fulfilled
      ),
      (state, { payload }) => {
        adapter.upsertOne(state, payload);
      }
    );
  },
});

const reducer = slice.reducer;

export default reducer;
