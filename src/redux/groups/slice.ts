import { createSlice, createEntityAdapter, isAnyOf } from '@reduxjs/toolkit';
import { GroupDto } from 'models/group';
import {
  createGroupThunk,
  deleteGroupThunk,
  getGroupByIdThunk,
  getGroupsByFacultyIdThunk,
  putGroupThunk,
} from './thunk';

export const adapter = createEntityAdapter<GroupDto>();

export const slice = createSlice({
  name: 'groups',
  initialState: adapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getGroupsByFacultyIdThunk.fulfilled,
      (state, { payload }) => {
        adapter.upsertMany(state, payload);
      }
    );
    builder.addCase(deleteGroupThunk.fulfilled, (state, { payload }) => {
      adapter.removeOne(state, payload);
    });
    builder.addMatcher(
      isAnyOf(
        getGroupByIdThunk.fulfilled,
        createGroupThunk.fulfilled,
        putGroupThunk.fulfilled
      ),
      (state, { payload }) => {
        adapter.upsertOne(state, payload);
      }
    );
  },
});

const reducer = slice.reducer;

export default reducer;
