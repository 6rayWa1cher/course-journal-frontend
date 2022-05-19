import { Container, Grid, Paper } from '@mui/material';
import { getCriteriaByCourseIdThunk } from '@redux/criteria';
import { getAllStudentsByCourseIdThunk } from '@redux/students';
import {
  getSubmissionsByCourseAndStudentThunk,
  getSubmissionsByCourseIdThunk,
  submissionsByStudentAndCourseSelector,
} from '@redux/submissions';
import { getTasksByCourseIdThunk, tasksByCourseSelector } from '@redux/tasks';
import { useAppDispatch } from '@redux/utils';
import { unwrapResult } from '@reduxjs/toolkit';
import BackButton from 'components/buttons/BackButton';
import ListSelector from 'components/ListSelector';
import NativeSelector from 'components/NativeSelector';
import PreLoading from 'components/PreLoading';
import Title from 'components/Title';
import { StudentDto, StudentId } from 'models/student';
import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { defaultErrorEnqueue } from 'utils/errorProcessor';
import {
  useLoadingActionThunk,
  useMySnackbar,
  useNarrowScreen,
  useNumberSearchState,
} from 'utils/hooks';
import { formatFullNameWithInitials } from 'utils/string';
import ScoringModule from './ScoringModule';

const SubmissionsPage = () => {
  const params = useParams();

  const courseId = Number(params.courseId);

  const [studentId, setStudentId] = useNumberSearchState('student');
  const [submitting, setSubmitting] = useState<boolean>(false);

  // const tasks = useParamSelector(tasksByCourseSelector, { courseId });
  // const criteria = useParamSelector(criteriaBy);
  // const submissions = useParamSelector(submissionsByStudentAndCourseSelector, {
  //   studentId: studentId ?? undefined,
  //   courseId,
  // });

  const { enqueueError } = useMySnackbar();
  const dispatch = useAppDispatch();
  const mainLoadingAction = useCallback(
    () =>
      Promise.all([
        dispatch(getAllStudentsByCourseIdThunk({ courseId })).then(
          unwrapResult
        ),
        dispatch(getTasksByCourseIdThunk({ courseId })).then(unwrapResult),
        dispatch(getCriteriaByCourseIdThunk({ courseId })).then(unwrapResult),
      ])
        .then(([students]) => students)
        .catch((e) => defaultErrorEnqueue(e as Error, enqueueError)),
    [courseId, dispatch, enqueueError]
  );

  const sideLoadingThunk = useCallback(
    () =>
      getSubmissionsByCourseAndStudentThunk({
        courseId,
        studentId: studentId ?? -1,
      }),
    [courseId, studentId]
  );
  const sideLoadingAction = useLoadingActionThunk(sideLoadingThunk);

  const narrowScreen = useNarrowScreen();

  const render = useCallback(
    (value: StudentDto[]) => {
      const items = value.map((item: StudentDto) => ({
        id: item.id,
        name: formatFullNameWithInitials(item),
      }));
      return (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Grid container>
                <Grid item>
                  <BackButton to={`/courses/${courseId}`} />
                </Grid>
                <Grid item xs>
                  <Title>Оценка заданий</Title>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2 }}>
              {narrowScreen ? (
                <NativeSelector
                  items={items}
                  label="Студенты"
                  selected={studentId}
                  onSelect={setStudentId}
                />
              ) : (
                <ListSelector
                  items={items}
                  selected={studentId}
                  onSelect={setStudentId}
                />
              )}
            </Paper>
          </Grid>
          <Grid item xs={12} md={9}>
            <Paper sx={{ p: 2 }}>
              {studentId != null && (
                <PreLoading action={sideLoadingAction}>
                  <ScoringModule courseId={courseId} studentId={studentId} />
                </PreLoading>
              )}
            </Paper>
          </Grid>
        </Grid>
      );
    },
    [courseId, narrowScreen, setStudentId, sideLoadingAction, studentId]
  );

  return (
    <Container>
      <PreLoading action={mainLoadingAction} render={render} />
    </Container>
  );
};

export default SubmissionsPage;
