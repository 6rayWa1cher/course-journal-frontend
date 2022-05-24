import {
  authUserIdSelector,
  loggedInWithSelector,
  courseTokenSelector,
} from '@redux/auth/selector';
import { eraseBag, loadBag } from '@redux/auth/slice';
import { loadUserDataThunk } from '@redux/authUsers/thunk';
import { resolveCourseTokenThunk } from '@redux/courseTokens/thunk';
import { createTypedAsyncThunk } from '@redux/utils';
import { unwrapResult } from '@reduxjs/toolkit';
import { AuthUserId } from 'models/authUser';
import { appSelector } from './selector';
import { WebApplicationState } from './types';

export const initAppThunk = createTypedAsyncThunk(
  'app/init',
  async (_, { dispatch, getState, requestId }) => {
    const { currentRequestId, state } = appSelector(getState());
    if (
      state !== WebApplicationState.LOADING ||
      requestId !== currentRequestId
    ) {
      return;
    }
    if (loggedInWithSelector(getState()) == null) {
      dispatch(loadBag());
    }
    const authMethod = loggedInWithSelector(getState());
    console.debug('logged in with', authMethod);
    try {
      if (authMethod === 'accessToken') {
        const authUserId = authUserIdSelector(getState()) as AuthUserId;
        await dispatch(loadUserDataThunk({ authUserId })).then(unwrapResult);
      } else if (authMethod === 'courseToken') {
        const token = courseTokenSelector(getState()) as string;
        await dispatch(resolveCourseTokenThunk({ token })).then(unwrapResult);
      }
    } catch (err) {
      console.warn('Emitting logout in response to ', err);
      dispatch(eraseBag());
    }
  }
);
