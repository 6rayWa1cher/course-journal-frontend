import { createSlice, createEntityAdapter, isAnyOf } from "@reduxjs/toolkit";
import { usersGetSelfUserThunk } from "./thunk";
import { UserDto } from "src/models/user";

export const usersAdapter = createEntityAdapter<UserDto>();

export const users = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(usersGetSelfUserThunk.fulfilled),
      (state, { payload }) => {
        usersAdapter.upsertOne(state, payload);
      }
    );
  },
});

const reducer = users.reducer;

export default reducer;
