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
import faculties from './faculties/slice';
import groups from './groups/slice';
import students from './students/slice';
import tasks from './tasks/slice';
import criteria from './criteria/slice';
import submissions from './submissions/slice';

const store = (() => {
  const reducer = combineReducers({
    app,
    auth,
    authUsers,
    criteria,
    courses,
    employees,
    faculties,
    groups,
    students,
    tasks,
    submissions,
  });

  const store = configureStore({ reducer });

  createWrappedApiInterceptor(store);
  createWrappedAuthApiInterceptor(store);

  return store;
})();

export default store;
