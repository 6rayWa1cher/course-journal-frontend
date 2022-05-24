import { getAllIdsBy } from '@redux/sliceUtils';
import { createSlice, createEntityAdapter, isAnyOf } from '@reduxjs/toolkit';
import { CourseTokenDto } from 'models/courseToken';
import {
  deleteCourseTokenThunk,
  getCourseTokenByIdThunk,
  getCourseTokensByCourseIdThunk,
  issueCourseTokenThunk,
  resolveCourseTokenThunk,
} from './thunk';

export const adapter = createEntityAdapter<CourseTokenDto>();

export const slice = createSlice({
  name: 'courseTokens',
  initialState: adapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteCourseTokenThunk.fulfilled, (state, { payload }) => {
      adapter.removeOne(state, payload);
    });
    builder.addMatcher(
      isAnyOf(
        getCourseTokensByCourseIdThunk.fulfilled,
        getCourseTokensByCourseIdThunk.rejected
      ),
      (state, { payload, meta }) => {
        const course = meta.arg.courseId;
        adapter.removeMany(state, getAllIdsBy(state, { course }));
        if (meta.requestStatus === 'fulfilled' && payload != null) {
          adapter.addOne(state, payload as CourseTokenDto);
        }
      }
    );
    builder.addMatcher(
      isAnyOf(
        issueCourseTokenThunk.fulfilled,
        getCourseTokenByIdThunk.fulfilled,
        resolveCourseTokenThunk.fulfilled
      ),
      (state, { payload }) => {
        adapter.upsertOne(state, payload);
      }
    );
  },
});

const reducer = slice.reducer;

export default reducer;
