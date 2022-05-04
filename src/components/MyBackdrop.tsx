import React from 'react';
import { Backdrop } from '@mui/material';

export interface MyBackdropProps {
  children: Children;
}

const MyBackdrop = ({ children }: MyBackdropProps) => (
  <Backdrop
    open={true}
    sx={{
      zIndex: (theme) => theme.zIndex.drawer + 1,
      color: '#fff',
    }}
  >
    {children}
  </Backdrop>
);
export default MyBackdrop;
