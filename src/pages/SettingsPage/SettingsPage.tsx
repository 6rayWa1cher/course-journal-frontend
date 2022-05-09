import { Box } from '@mui/system';
import { useDocumentTitle } from 'utils/hooks';
import AuthUserModule from './AuthUserModule';

const SettingsPage = () => {
  useDocumentTitle('Настройки');

  return (
    <Box>
      <AuthUserModule />
    </Box>
  );
};

export default SettingsPage;
