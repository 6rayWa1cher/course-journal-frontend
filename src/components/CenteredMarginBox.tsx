import { Box } from '@mui/system';
import React from 'react';

export interface CenteredMarginBoxProps {
  children: Children;
}

const CenteredMarginBox = ({ children }: CenteredMarginBoxProps) => (
  <Box
    sx={{
      mt: 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    {children}
  </Box>
);

export default CenteredMarginBox;
