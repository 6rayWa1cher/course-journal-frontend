import { Divider, Grid, List } from '@mui/material';
import { studentInitialsByIdSelector } from '@redux/students';
import SubTitle from 'components/SubTitle';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useNarrowScreen, useParamSelector } from 'utils/hooks';
import { BatchSetSubmissionsSchemaType } from 'validation/yup/submission';
import ScoringTaskForm from './ScoringTaskForm';

const ScoringForm = () => {
  const { watch, control } = useFormContext<BatchSetSubmissionsSchemaType>();

  const { fields: submissionFields } = useFieldArray({
    control,
    name: 'submissions',
  });

  const studentId = watch('studentId');

  const student = useParamSelector(studentInitialsByIdSelector, { studentId });

  const narrowScreen = useNarrowScreen();
  console.log(narrowScreen);

  return (
    <>
      <SubTitle>{student}</SubTitle>
      <Divider />
      {/* <Grid container spacing={2}>
        {submissionFields.map(({ id }, index) =>
          narrowScreen ? (
            <List>
              <ScoringTaskForm index={index} asListItem />
            </List>
          ) : (
            <Grid key={id} item xs={12} sm={6} lg={4}>
              <ScoringTaskForm index={index} />
            </Grid>
          )
        )}
      </Grid> */}
      {narrowScreen ? (
        <List>
          {submissionFields.map(({ id }, index) => (
            <ScoringTaskForm key={id} index={index} asListItem />
          ))}
        </List>
      ) : (
        <Grid container spacing={2}>
          {submissionFields.map(({ id }, index) => (
            <Grid key={id} item xs={12} sm={6} lg={4}>
              <ScoringTaskForm index={index} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default ScoringForm;
