import { createSlice, createEntityAdapter, isAnyOf } from '@reduxjs/toolkit';
import { StudentDto } from 'models/student';
import {
  batchCreateStudentThunk,
  createStudentThunk,
  deleteStudentThunk,
  getStudentByIdThunk,
  getStudentsByGroupIdThunk,
  putStudentThunk,
} from './thunk';

export const adapter = createEntityAdapter<StudentDto>();

export const slice = createSlice({
  name: 'groups',
  initialState: adapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteStudentThunk.fulfilled, (state, { payload }) => {
      adapter.removeOne(state, payload);
    });
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
