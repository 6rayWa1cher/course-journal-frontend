import { getAllIdsBy } from '@redux/sliceUtils';
import { createSlice, createEntityAdapter, isAnyOf } from '@reduxjs/toolkit';
import { GroupDto } from 'models/group';
import {
  createGroupThunk,
  deleteGroupThunk,
  getGroupByIdThunk,
  getGroupsByCourseIdThunk,
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
      getGroupsByCourseIdThunk.fulfilled,
      (state, { payload }) => {
        adapter.removeAll(state);
        adapter.addMany(state, payload);
      }
    );
    builder.addCase(
      getGroupsByFacultyIdThunk.fulfilled,
      (state, { payload, meta }) => {
        const faculty = meta.arg.facultyId;
        adapter.removeMany(state, getAllIdsBy(state.entities, { faculty }));
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
