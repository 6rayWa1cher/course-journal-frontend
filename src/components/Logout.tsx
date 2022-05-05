import { logoutThunk } from '@redux/auth';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTypedDispatch } from 'utils/hooks';
import MyBackdrop from './MyBackdrop';
import { CircularProgress } from '@mui/material';

const Logout = () => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(logoutThunk({ bothTokensInvalid: false })).then((action) => {
      if (action.meta.requestStatus === 'rejected' && action.meta.condition) {
        return;
      }
      navigate('/', { replace: true });
    });
  }, [navigate, dispatch]);
  return (
    <MyBackdrop>
      <CircularProgress />
    </MyBackdrop>
  );
};

export default Logout;
