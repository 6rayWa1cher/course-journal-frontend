import { createSlice, createEntityAdapter, isAnyOf } from '@reduxjs/toolkit';
import { chain, filter } from 'lodash';
import { StudentDto } from 'models/student';
import {
  batchCreateStudentThunk,
  createStudentThunk,
  deleteStudentThunk,
  getAllStudentsByCourseIdThunk,
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
    builder.addCase(
      getAllStudentsByCourseIdThunk.fulfilled,
      (state, { payload, meta }) => {
        const course = meta.arg.courseId;
        adapter.removeMany(
          state,
          chain(state.entities)
            .values()
            .compact()
            .filter({ course })
            .map((s) => s.id)
            .value()
        );
        adapter.addMany(state, payload);
      }
    );
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
  },
});

const reducer = slice.reducer;

export default reducer;
