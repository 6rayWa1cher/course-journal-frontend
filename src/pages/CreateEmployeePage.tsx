import { Container, Grid, IconButton, Paper } from '@mui/material';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Title from 'components/Title';
import CreateEmployeeForm from 'components/forms/EmployeeForm/CreateEmployeeForm';
import { useDocumentTitle } from 'utils/hooks';

const CreateEmployeePage = () => {
  useDocumentTitle('Создание преподавателя');
  const navigate = useNavigate();
  const handleBackButtonClick = useCallback(() => navigate(-1), [navigate]);

  return (
    <Paper sx={{ p: 1 }}>
      <Container sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item>
            <IconButton onClick={handleBackButtonClick}>
              <ArrowBackIosNewIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Title>Создание преподавателя</Title>
          </Grid>
        </Grid>
        <CreateEmployeeForm />
      </Container>
    </Paper>
  );
};

export default CreateEmployeePage;
