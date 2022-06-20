import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadVisual, saveVisual } from 'service/visual';
import { VisualState } from './types';

const initialState: VisualState = {
  themeMode: 'system',
};

export const slice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    loadVisualState() {
      return loadVisual();
    },
    setThemeMode(state, { payload }: PayloadAction<VisualState['themeMode']>) {
      state.themeMode = payload;
      saveVisual(state);
    },
  },
});

export const { loadVisualState, setThemeMode } = slice.actions;

const reducer = slice.reducer;

export default reducer;
