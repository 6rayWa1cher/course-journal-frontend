import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { useAppDispatch } from '@redux/utils';
import { ThemeMode, themeModeSelector, setThemeMode } from '@redux/visual';
import { useCallback } from 'react';
import { useTypedSelector } from 'utils/hooks';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';

const ThemeToggle = () => {
  const themeMode = useTypedSelector(themeModeSelector);

  const dispatch = useAppDispatch();
  const handleThemeToggle = useCallback(
    (_: unknown, mode: ThemeMode) => dispatch(setThemeMode(mode)),
    [dispatch]
  );

  return (
    <ToggleButtonGroup value={themeMode} exclusive onChange={handleThemeToggle}>
      <ToggleButton value="system">
        <SettingsBrightnessIcon />
      </ToggleButton>
      <ToggleButton value="light">
        <LightModeIcon />
      </ToggleButton>
      <ToggleButton value="dark">
        <DarkModeIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ThemeToggle;
