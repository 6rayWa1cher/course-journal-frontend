import { IconButton } from '@mui/material';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useBackLocation } from 'utils/hooks';

export interface BackButtonProps {
  to?: string | number;
  replace?: boolean;
}

const BackButton = ({ to, replace = false }: BackButtonProps) => {
  const navigate = useNavigate();
  const backPathname = useBackLocation();
  const handleBackButtonClick = useCallback(
    () =>
      to != null
        ? typeof to === 'string'
          ? navigate(to, { replace })
          : navigate(to)
        : navigate(backPathname, { replace }),
    [navigate, to, replace, backPathname]
  );
  return (
    <IconButton onClick={handleBackButtonClick}>
      <ArrowBackIosNewIcon />
    </IconButton>
  );
};

export default BackButton;
