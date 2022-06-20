import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { AttendanceDto } from 'models/attendance';
import { getAttendanceByIdThunk } from './thunk';

export const adapter = createEntityAdapter<AttendanceDto>();

export const slice = createSlice({
  name: 'attendances',
  initialState: adapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAttendanceByIdThunk.fulfilled, (state, { payload }) => {
      adapter.upsertOne(state, payload);
    });
  },
});

const reducer = slice.reducer;

export default reducer;
