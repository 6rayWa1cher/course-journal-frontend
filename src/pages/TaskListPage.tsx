import { Paper, Container, Grid } from '@mui/material';
import { courseByIdSelector, getCourseByIdThunk } from '@redux/courses';
import {
  getTasksByCourseIdThunk,
  tasksByCourseSelector,
  tasksByCourseTaskNumberSortSelector,
} from '@redux/tasks';
import { useAppDispatch } from '@redux/utils';
import { unwrapResult } from '@reduxjs/toolkit';
import AddButton from 'components/buttons/AddButton';
import BackButton from 'components/buttons/BackButton';
import NavListWithAvatars from 'components/NavListWithAvatars';
import PreLoading from 'components/PreLoading';
import Title from 'components/Title';
import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { defaultErrorEnqueue } from 'utils/errorProcessor';
import { useDocumentTitle, useMySnackbar, useParamSelector } from 'utils/hooks';

export interface TeacherTasksPageProps {
  readonly?: boolean;
}

const TaskListPage = ({ readonly = false }: TeacherTasksPageProps) => {
  const params = useParams();

  const courseId = Number(params.courseId);

  const dispatch = useAppDispatch();
  const { enqueueError } = useMySnackbar();
  const loadingAction = useCallback(async () => {
    try {
      const tasks = await dispatch(getTasksByCourseIdThunk({ courseId })).then(
        unwrapResult
      );
      await dispatch(getCourseByIdThunk({ courseId })).then(unwrapResult);
      return tasks;
    } catch (e) {
      defaultErrorEnqueue(e as Error, enqueueError);
    }
  }, [courseId, dispatch, enqueueError]);

  const tasks = useParamSelector(tasksByCourseTaskNumberSortSelector, {
    courseId,
  });
  const course = useParamSelector(courseByIdSelector, { courseId });

  useDocumentTitle(
    course != null ? `Задания курса ${course.name}` : 'Задания курса'
  );
  const pathname = useLocation().pathname;

  const navigate = useNavigate();
  const handleAddClick = useCallback(
    () => navigate(`${pathname}/create`),
    [navigate, pathname]
  );

  const taskItems = useMemo(
    () =>
      tasks.map((t) => ({
        id: t.id,
        name: t.title,
        link: `${pathname}/${t.id}`,
        avatar: t.taskNumber,
      })),
    [tasks, pathname]
  );

  return (
    <Paper sx={{ p: 2 }}>
      <Container>
        <PreLoading action={loadingAction}>
          <Grid container spacing={2}>
            <Grid
              item
              container
              justifyContent="space-between"
              xs={12}
              spacing={2}
            >
              <Grid item>
                <BackButton />
              </Grid>
              <Grid item xs>
                <Title>Задания курса {course?.name}</Title>
              </Grid>
              {!readonly && (
                <Grid item>
                  <AddButton onClick={handleAddClick} />
                </Grid>
              )}
            </Grid>
            <Grid item xs={12}>
              <NavListWithAvatars items={taskItems} />
            </Grid>
          </Grid>
        </PreLoading>
      </Container>
    </Paper>
  );
};

export default TaskListPage;
