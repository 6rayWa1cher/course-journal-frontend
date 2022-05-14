import { IconButton } from '@mui/material';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export interface BackButtonProps {
  to: string | number;
  replace?: boolean;
}

const BackButton = ({ to, replace = false }: BackButtonProps) => {
  const navigate = useNavigate();
  const handleBackButtonClick = useCallback(
    () => (typeof to === 'string' ? navigate(to, { replace }) : navigate(to)),
    [navigate, to, replace]
  );
  return (
    <IconButton onClick={handleBackButtonClick}>
      <ArrowBackIosNewIcon />
    </IconButton>
  );
};

export default BackButton;
