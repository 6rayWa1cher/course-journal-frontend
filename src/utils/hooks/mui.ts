import { useMediaQuery, useTheme } from '@mui/material';

export const useNarrowScreen = () => {
  const theme = useTheme();
  const narrowScreen = useMediaQuery(theme.breakpoints.down('md'));
  return narrowScreen;
};
