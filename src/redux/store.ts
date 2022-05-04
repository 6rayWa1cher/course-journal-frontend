import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  createWrappedApiInterceptor,
  createWrappedAuthApiInterceptor,
} from 'api/helpers/enhancer';
import app from './app/slice';
import auth from './auth/slice';
import authUsers from './authUsers/slice';
import courses from './courses/slice';
import employees from './employees/slice';

const store = (() => {
  const reducer = combineReducers({
    app,
    auth,
    authUsers,
    courses,
    employees,
  });

  const store = configureStore({ reducer });

  createWrappedApiInterceptor(store);
  createWrappedAuthApiInterceptor(store);

  return store;
})();

export default store;
