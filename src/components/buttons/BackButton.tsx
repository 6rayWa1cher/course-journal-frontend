import { IconButton } from '@mui/material';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export interface BackButtonProps {
  to: string;
}

const BackButton = ({ to }: BackButtonProps) => {
  const navigate = useNavigate();
  const handleBackButtonClick = useCallback(() => navigate(to), [navigate, to]);
  return (
    <IconButton onClick={handleBackButtonClick}>
      <ArrowBackIosNewIcon />
    </IconButton>
  );
};

export default BackButton;
