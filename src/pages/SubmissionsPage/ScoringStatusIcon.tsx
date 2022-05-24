import { Box, CircularProgress } from '@mui/material';
import { ScoringModuleStatus } from './types';
import DoneIcon from '@mui/icons-material/Done';
import ErrorIcon from '@mui/icons-material/Error';

export interface StatusIconProps {
  status: ScoringModuleStatus;
}

const ScoringStatusIcon = ({ status }: StatusIconProps) => {
  const body = (() => {
    switch (status) {
      case ScoringModuleStatus.WAITING:
        return (
          <Box sx={{ display: 'inline-block', transform: 'scaleX(-1)' }}>
            <CircularProgress size="small" color="inherit" />
          </Box>
        );
      case ScoringModuleStatus.SUBMITTING:
        return <CircularProgress size="small" color="primary" />;
      case ScoringModuleStatus.COMPLETE:
        return <DoneIcon />;
      case ScoringModuleStatus.ERROR:
        return <ErrorIcon />;
      default:
        return <></>;
    }
  })();
  return <Box sx={{ width: '24px', height: '24px' }}>{body}</Box>;
};

export default ScoringStatusIcon;
