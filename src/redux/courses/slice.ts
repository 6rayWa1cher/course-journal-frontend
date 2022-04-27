import { createSlice, createEntityAdapter, isAnyOf } from "@reduxjs/toolkit";
import { usersGetSelfUserThunk } from "./thunk";
import { CourseDto } from "models/course";

export const coursesAdapter = createEntityAdapter<CourseDto>();

export const users = createSlice({
  name: "users",
  initialState: coursesAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(usersGetSelfUserThunk.fulfilled),
      (state, { payload }) => {
        coursesAdapter.upsertOne(state, payload);
      }
    );
  },
});

const reducer = users.reducer;

export default reducer;
