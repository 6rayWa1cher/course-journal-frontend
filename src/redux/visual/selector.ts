import { RootState } from '@redux/types';
import { createSelector } from '@reduxjs/toolkit';

export const visualSelector = (state: RootState) => state.visual;

export const themeModeSelector = createSelector(
  visualSelector,
  (state) => state.themeMode
);
