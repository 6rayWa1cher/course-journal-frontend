import { Paper, Container, Grid } from '@mui/material';
import { courseByIdSelector, getCourseByIdThunk } from '@redux/courses';
import { useAppDispatch } from '@redux/utils';
import { unwrapResult } from '@reduxjs/toolkit';
import BackButton from 'components/buttons/BackButton';
import DeleteButtonWithConfirm from 'components/buttons/DeleteButtonWithConfirm';
import CardLink from 'components/CardLink';
import PreLoading from 'components/PreLoading';
import Title from 'components/Title';
import { useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { defaultErrorEnqueue } from 'utils/errorProcessor';
import {
  useDocumentTitle,
  useLoadingActionThunk,
  useMySnackbar,
  useParamSelector,
} from 'utils/hooks';
import { deleteCourseThunk } from '../redux/courses/thunk';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import EditButton from 'components/buttons/EditButton';
import SettingsIcon from '@mui/icons-material/Settings';

const CoursePage = () => {
  const params = useParams();

  const courseId = Number(params.courseId);

  const thunk = useCallback(() => getCourseByIdThunk({ courseId }), [courseId]);
  const loadingAction = useLoadingActionThunk(thunk);
  const course = useParamSelector(courseByIdSelector, { courseId });

  useDocumentTitle(course?.name ?? 'Курс');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { enqueueSuccess, enqueueError } = useMySnackbar();
  const handleDelete = useCallback(async () => {
    try {
      await dispatch(deleteCourseThunk({ courseId })).then(unwrapResult);
      enqueueSuccess(`Курс ${course?.name} успешно удален`);
      navigate('/courses', { replace: true });
    } catch (e) {
      defaultErrorEnqueue(e as Error, enqueueError);
    }
  }, [
    course?.name,
    courseId,
    dispatch,
    enqueueError,
    enqueueSuccess,
    navigate,
  ]);

  const buttonItems = useMemo(
    () => [
      {
        title: 'Оценки',
        link: `/courses/${courseId}/submissions`,
        Icon: TaskAltIcon,
      },
      {
        title: 'Задания',
        link: `/courses/${courseId}/tasks`,
        Icon: AssignmentIcon,
      },
      {
        title: 'Настройки',
        link: `/courses/${courseId}/settings`,
        Icon: SettingsIcon,
      },
    ],
    [courseId]
  );

  const handleEditClick = useCallback(
    () => navigate(`/courses/${courseId}/edit`),
    [navigate, courseId]
  );

  return (
    <>
      <Paper sx={{ p: 2 }}>
        <Container>
          <PreLoading action={loadingAction}>
            <Grid container spacing={2}>
              <Grid container item xs={12} spacing={2}>
                <Grid item>
                  <BackButton to="/courses" />
                </Grid>
                <Grid item xs>
                  <Title>{course?.name}</Title>
                </Grid>
                <Grid item>
                  <EditButton onClick={handleEditClick} />
                </Grid>
                <Grid item>
                  <DeleteButtonWithConfirm
                    onDelete={handleDelete}
                    dialogTitle={`Удалить курс ${course?.name}`}
                    dialogDescription="Эта операция необратима и приведет к удалению всех заданий, оценок и отметок посещаемости"
                  />
                </Grid>
              </Grid>
            </Grid>
          </PreLoading>
        </Container>
      </Paper>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ pt: 3 }}
      >
        {buttonItems.map((item, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <CardLink {...item} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default CoursePage;
