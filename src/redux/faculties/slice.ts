import { createSlice, createEntityAdapter, isAnyOf } from '@reduxjs/toolkit';
import { FacultyDto } from 'models/faculty';
import {
  createFacultyThunk,
  deleteFacultyThunk,
  getAllFacultiesThunk,
  getFacultyByIdThunk,
  putFacultyThunk,
} from './thunk';

export const adapter = createEntityAdapter<FacultyDto>();

export const slice = createSlice({
  name: 'faculties',
  initialState: adapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllFacultiesThunk.fulfilled, (state, { payload }) => {
      adapter.upsertMany(state, payload);
    });
    builder.addCase(deleteFacultyThunk.fulfilled, (state, { payload }) => {
      adapter.removeOne(state, payload);
    });
    builder.addMatcher(
      isAnyOf(
        getFacultyByIdThunk.fulfilled,
        createFacultyThunk.fulfilled,
        putFacultyThunk.fulfilled
      ),
      (state, { payload }) => {
        adapter.upsertOne(state, payload);
      }
    );
  },
});

const reducer = slice.reducer;

export default reducer;
