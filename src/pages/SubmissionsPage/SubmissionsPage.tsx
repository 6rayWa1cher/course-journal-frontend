import { Container, Grid, Paper } from '@mui/material';
import { courseByIdSelector, getCourseByIdThunk } from '@redux/courses';
import { getCriteriaByCourseIdThunk } from '@redux/criteria';
import {
  getAllStudentsByCourseIdThunk,
  studentsByCourseSelector,
} from '@redux/students';
import { getSubmissionsByCourseAndStudentThunk } from '@redux/submissions';
import { getTasksByCourseIdThunk } from '@redux/tasks';
import { useAppDispatch } from '@redux/utils';
import { unwrapResult } from '@reduxjs/toolkit';
import BackButton from 'components/buttons/BackButton';
import ListSelector from 'components/ListSelector';
import NativeSelector from 'components/NativeSelector';
import PreLoading from 'components/PreLoading';
import Scrollable from 'components/Scrollable';
import Title from 'components/Title';
import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { defaultErrorEnqueue } from 'utils/errorProcessor';
import {
  useDocumentTitle,
  useLoadingActionThunk,
  useMySnackbar,
  useNarrowScreen,
  useNumberSearchState,
  useParamSelector,
  usePrompt,
} from 'utils/hooks';
import { formatFullNameWithInitials } from 'utils/string';
import ScoringModule from './ScoringModule';
import { ScoringModuleStatus } from './types';

const SubmissionsPage = () => {
  const params = useParams();

  const courseId = Number(params.courseId);

  const [studentId, setStudentId] = useNumberSearchState('student');
  const [status, setStatus] = useState<ScoringModuleStatus>(
    ScoringModuleStatus.IDLE
  );
  const disableNavigation =
    status === ScoringModuleStatus.WAITING ||
    status === ScoringModuleStatus.SUBMITTING;

  usePrompt(
    'Вы действительно хотите уйти со страницы? Оценки ещё НЕ сохранены!',
    disableNavigation
  );

  const { enqueueError } = useMySnackbar();
  const dispatch = useAppDispatch();
  const mainLoadingAction = useCallback(async () => {
    try {
      await dispatch(getCourseByIdThunk({ courseId })).then(unwrapResult);
      await dispatch(getAllStudentsByCourseIdThunk({ courseId })).then(
        unwrapResult
      );
      await dispatch(getTasksByCourseIdThunk({ courseId })).then(unwrapResult);
      return await dispatch(getCriteriaByCourseIdThunk({ courseId })).then(
        unwrapResult
      );
    } catch (e) {
      defaultErrorEnqueue(e as Error, enqueueError);
    }
  }, [courseId, dispatch, enqueueError]);

  const sideLoadingThunk = useCallback(
    () =>
      getSubmissionsByCourseAndStudentThunk({
        courseId,
        studentId: studentId ?? -1,
      }),
    [courseId, studentId]
  );
  const sideLoadingAction = useLoadingActionThunk(sideLoadingThunk);

  const students = useParamSelector(studentsByCourseSelector, { courseId });
  const studentItems = students.map((item) => ({
    id: item.id,
    name: formatFullNameWithInitials(item),
  }));

  const course = useParamSelector(courseByIdSelector, { courseId });
  useDocumentTitle(
    course != null ? `Оценка заданий - "${course.name}"` : 'Оценка заданий'
  );

  const narrowScreen = useNarrowScreen();

  return (
    <Container>
      <PreLoading action={mainLoadingAction}>
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
                  items={studentItems}
                  label="Студенты"
                  selected={studentId}
                  onSelect={setStudentId}
                  disabled={disableNavigation}
                />
              ) : (
                <Scrollable height="calc(85vh - 150px)">
                  <ListSelector
                    items={studentItems}
                    selected={studentId}
                    onSelect={setStudentId}
                    disabled={disableNavigation}
                  />
                </Scrollable>
              )}
            </Paper>
          </Grid>
          <Grid item xs={12} md={9}>
            <Paper sx={{ p: 2 }}>
              {studentId != null && (
                <PreLoading action={sideLoadingAction}>
                  <ScoringModule
                    courseId={courseId}
                    studentId={studentId}
                    status={status}
                    setStatus={setStatus}
                  />
                </PreLoading>
              )}
            </Paper>
          </Grid>
        </Grid>
      </PreLoading>
    </Container>
  );
};

export default SubmissionsPage;
