import { IconButton } from '@mui/material';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const BackButton = () => {
  const navigate = useNavigate();
  const handleBackButtonClick = useCallback(() => navigate(-1), [navigate]);
  return (
    <IconButton onClick={handleBackButtonClick}>
      <ArrowBackIosNewIcon />
    </IconButton>
  );
};

export default BackButton;
