import { VisualState } from '@redux/visual/types';
import { load, save } from 'utils/localStorage';

const themeModeKey = 'visual.themeMode';

export const saveVisual = ({ themeMode }: VisualState) => {
  save(themeModeKey, themeMode);
};

export const loadVisual = (): VisualState => {
  const themeMode = load(themeModeKey);
  return {
    themeMode:
      themeMode === 'system' || themeMode === 'light' || themeMode === 'dark'
        ? themeMode
        : 'system',
  };
};
