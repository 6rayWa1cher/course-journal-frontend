import { Paper, Container, Grid } from '@mui/material';
import { courseByIdSelector, getCourseByIdThunk } from '@redux/courses';
import { getCourseTokensByCourseIdThunk } from '@redux/courseTokens';
import { useAppDispatch } from '@redux/utils';
import { unwrapResult } from '@reduxjs/toolkit';
import BackButton from 'components/buttons/BackButton';
import PreLoading from 'components/PreLoading';
import Title from 'components/Title';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { defaultErrorEnqueue } from 'utils/errorProcessor';
import { useDocumentTitle, useMySnackbar, useParamSelector } from 'utils/hooks';
import CourseTokenSettings from './CourseTokenSettings';

const CourseSettingsPage = () => {
  const params = useParams();

  const courseId = Number(params.courseId);

  const dispatch = useAppDispatch();
  const { enqueueError } = useMySnackbar();
  const loadingAction = useCallback(async () => {
    try {
      await dispatch(getCourseTokensByCourseIdThunk({ courseId }));
      return await dispatch(getCourseByIdThunk({ courseId })).then(
        unwrapResult
      );
    } catch (e) {
      defaultErrorEnqueue(e as Error, enqueueError);
    }
  }, [courseId, dispatch, enqueueError]);

  const course = useParamSelector(courseByIdSelector, { courseId });
  useDocumentTitle(
    course != null ? `Настройки курса - ${course.name}` : 'Настройки курса'
  );

  return (
    <Paper sx={{ p: 2 }}>
      <Container>
        <PreLoading action={loadingAction}>
          <Grid container spacing={2}>
            <Grid item xs={12} container spacing={2}>
              <Grid item>
                <BackButton to={`/courses/${courseId}`} />
              </Grid>
              <Grid item xs>
                <Title>{course?.name}</Title>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <CourseTokenSettings courseId={courseId} />
            </Grid>
          </Grid>
        </PreLoading>
      </Container>
    </Paper>
  );
};

export default CourseSettingsPage;
