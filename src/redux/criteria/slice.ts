import { getAllIdsBy } from '@redux/sliceUtils';
import {
  createTaskWithCriteriaThunk,
  putTaskWithCriteriaThunk,
} from '@redux/tasks';
import { createSlice, createEntityAdapter, isAnyOf } from '@reduxjs/toolkit';
import { CriteriaDto } from 'models/criteria';
import {
  createCriteriaThunk,
  deleteCriteriaThunk,
  getCriteriaByCourseIdThunk,
  getCriteriaByIdThunk,
  getCriteriaByTaskIdThunk,
  putCriteriaThunk,
} from './thunk';

export const adapter = createEntityAdapter<CriteriaDto>();

export const slice = createSlice({
  name: 'criteria',
  initialState: adapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getCriteriaByTaskIdThunk.fulfilled,
      (state, { payload }) => {
        adapter.upsertMany(state, payload);
      }
    );
    builder.addCase(
      createTaskWithCriteriaThunk.fulfilled,
      (state, { payload }) => {
        adapter.addMany(state, payload.criteria);
      }
    );
    builder.addCase(deleteCriteriaThunk.fulfilled, (state, { payload }) => {
      adapter.removeOne(state, payload);
    });
    builder.addCase(
      getCriteriaByCourseIdThunk.fulfilled,
      (state, { payload }) => {
        adapter.setAll(state, payload);
      }
    );
    builder.addCase(
      putTaskWithCriteriaThunk.fulfilled,
      (state, { payload }) => {
        const task = payload.task.id;
        adapter.removeMany(state, getAllIdsBy(state.entities, { task }));
        adapter.upsertMany(state, payload.criteria);
      }
    );
    builder.addMatcher(
      isAnyOf(
        getCriteriaByIdThunk.fulfilled,
        createCriteriaThunk.fulfilled,
        putCriteriaThunk.fulfilled
      ),
      (state, { payload }) => {
        adapter.upsertOne(state, payload);
      }
    );
  },
});

const reducer = slice.reducer;

export default reducer;
