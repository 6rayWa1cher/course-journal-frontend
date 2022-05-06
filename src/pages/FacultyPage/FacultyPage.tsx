import { Divider, Grid, Paper } from '@mui/material';
import SubTitle from 'components/SubTitle';
import { useParams } from 'react-router-dom';
import FacultyModule from './FacultyModule';
import GroupsModule from './GroupsModule';

const FacultyPage = () => {
  const params = useParams();

  const facultyId = Number(params.facultyId);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <FacultyModule facultyId={facultyId} />
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <SubTitle>Группы и студенты</SubTitle>
          <Divider />
          <GroupsModule facultyId={facultyId} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default FacultyPage;
