import { Grid, Paper } from '@mui/material';
import { Box } from '@mui/system';
import BackButton from 'components/buttons/BackButton';
import Title from 'components/Title';
import { useDocumentTitle } from 'utils/hooks';
import AuthUserModule from './AuthUserModule';

const SettingsPage = () => {
  useDocumentTitle('Настройки');

  return (
    <>
      <Paper sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid item>
            <BackButton />
          </Grid>
          <Grid item xs>
            <Title>Преподаватели</Title>
          </Grid>
        </Grid>
      </Paper>
      <Box sx={{ pt: 2 }}>
        <AuthUserModule />
      </Box>
    </>
  );
};

export default SettingsPage;
