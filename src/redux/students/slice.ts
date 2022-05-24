import { getAllIdsBy } from '@redux/sliceUtils';
import { createSlice, createEntityAdapter, isAnyOf } from '@reduxjs/toolkit';
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
        adapter.removeMany(state, getAllIdsBy(state.entities, { course }));
        adapter.addMany(state, payload);
      }
    );
    builder.addCase(
      getStudentsByGroupIdThunk.fulfilled,
      (state, { payload, meta }) => {
        const group = meta.arg.groupId;
        adapter.removeMany(state, getAllIdsBy(state.entities, { group }));
        adapter.addMany(state, payload);
      }
    );
    builder.addCase(batchCreateStudentThunk.fulfilled, (state, { payload }) => {
      adapter.upsertMany(state, payload);
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
  },
});

const reducer = slice.reducer;

export default reducer;
