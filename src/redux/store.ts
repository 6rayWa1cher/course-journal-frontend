import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  createWrappedApiInterceptor,
  createWrappedAuthApiInterceptor,
} from "api/enhancer";
import app from "./app/slice";
import auth from "./auth/slice";
import users from "./users/slice";

const store = (() => {
  const reducer = combineReducers({
    app,
    auth,
    users,
  });

  const store = configureStore({ reducer });

  createWrappedApiInterceptor(store);
  createWrappedAuthApiInterceptor(store);

  return store;
})();

export default store;
