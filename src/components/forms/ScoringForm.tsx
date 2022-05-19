import {
  Box,
  Divider,
  Grid,
  IconButton,
  List,
  Typography,
} from '@mui/material';
import { studentByIdSelector } from '@redux/students';
import SubTitle from 'components/SubTitle';
import { range, sumBy, without } from 'lodash';
import ScoringStatusIcon from 'pages/SubmissionsPage/ScoringStatusIcon';
import { ScoringModuleStatus } from 'pages/SubmissionsPage/types';
import { useCallback, useMemo, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useNarrowScreen, useParamSelector } from 'utils/hooks';
import { getFullName } from 'utils/string';
import { BatchSetSubmissionsSchemaType } from 'validation/yup/submission';
import ScoringTaskForm from './ScoringTaskForm';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { submissionsByStudentAndCourseSelector } from '@redux/submissions';
import { tasksByCourseSelector } from '@redux/tasks';
export interface ScoringFormProps {
  status: ScoringModuleStatus;
}

const ScoringForm = ({ status }: ScoringFormProps) => {
  const { watch, control } = useFormContext<BatchSetSubmissionsSchemaType>();

  const { fields: submissionFields } = useFieldArray({
    control,
    name: 'submissions',
  });

  const courseId = watch('courseId');
  const studentId = watch('studentId');

  const student = useParamSelector(studentByIdSelector, { studentId });
  const submissions = useParamSelector(submissionsByStudentAndCourseSelector, {
    courseId,
    studentId,
  });
  const tasks = useParamSelector(tasksByCourseSelector, { courseId });

  const [openArray, setOpenArray] = useState<number[]>([]);
  const handleShowClick = useCallback(
    (index: number) => () =>
      setOpenArray((openArray) =>
        openArray.includes(index)
          ? without(openArray, index)
          : [...openArray, index]
      ),
    [setOpenArray]
  );
  const handleAllShowClick = useCallback(
    () =>
      setOpenArray((openArray) =>
        openArray.length === submissionFields.length
          ? []
          : range(submissionFields.length)
      ),
    [setOpenArray, submissionFields.length]
  );

  const narrowScreen = useNarrowScreen();

  const totalScore = useMemo(
    () => sumBy(submissions, (s) => s.mainScore + s.additionalScore),
    [submissions]
  );
  const maxScore = useMemo(() => sumBy(tasks, 'maxScore'), [tasks]);

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs>
          <SubTitle>{student && getFullName(student)}</SubTitle>
        </Grid>
        <Grid item>
          <Box
            sx={{
              borderRight: (theme) => `1px solid ${theme.palette.divider}`,
              py: 1,
              pr: 2,
            }}
          >
            <ScoringStatusIcon status={status} />
          </Box>
        </Grid>
        <Grid item>
          <IconButton onClick={handleAllShowClick}>
            {openArray.length !== submissionFields.length ? (
              <UnfoldMoreIcon />
            ) : (
              <UnfoldLessIcon />
            )}
          </IconButton>
        </Grid>
      </Grid>
      <Divider sx={{ pt: 1 }} />
      {narrowScreen ? (
        <List>
          {submissionFields.map(({ id }, index) => (
            <ScoringTaskForm
              key={id}
              index={index}
              open={openArray.includes(index)}
              onOpenClick={handleShowClick(index)}
              asListItem
            />
          ))}
        </List>
      ) : (
        <Grid container spacing={2}>
          {submissionFields.map(({ id }, index) => (
            <Grid key={id} item xs={12} sm={6} lg={4}>
              <ScoringTaskForm
                open={openArray.includes(index)}
                onOpenClick={handleShowClick(index)}
                index={index}
              />
            </Grid>
          ))}
        </Grid>
      )}
      <Divider />
      <Grid container spacing={5} justifyContent="center" pt={2}>
        <Grid item>
          <Typography variant="h5">Всего баллов:</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h5">
            {totalScore} / {maxScore}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default ScoringForm;
