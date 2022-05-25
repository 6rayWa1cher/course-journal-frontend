import { createTheme, ThemeProvider, useMediaQuery } from '@mui/material';
import { themeModeSelector } from '@redux/visual';
import { useMemo } from 'react';
import { useTypedSelector } from 'utils/hooks';

export interface LocalThemeProviderProps {
  children: Children;
}

const LocalThemeProvider = ({ children }: LocalThemeProviderProps) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const themeModeFromStore = useTypedSelector(themeModeSelector);
  const themeMode = useMemo(
    () =>
      themeModeFromStore === 'system'
        ? prefersDarkMode
          ? 'dark'
          : 'light'
        : themeModeFromStore,
    [themeModeFromStore, prefersDarkMode]
  );
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
        },
      }),
    [themeMode]
  );
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default LocalThemeProvider;
