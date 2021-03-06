import {
  Paper,
  Container,
  Grid,
  Divider,
  Typography,
  Chip,
} from '@mui/material';
import { getCourseByIdThunk, courseByIdSelector } from '@redux/courses';
import {
  getCriteriaByTaskIdThunk,
  normalizedCriteriaByTaskSelector,
} from '@redux/criteria';
import {
  deleteTaskThunk,
  getTaskByIdThunk,
  taskByIdSelector,
} from '@redux/tasks';
import { useAppDispatch } from '@redux/utils';
import { unwrapResult } from '@reduxjs/toolkit';
import BackButton from 'components/buttons/BackButton';
import DeleteButtonWithConfirm from 'components/buttons/DeleteButtonWithConfirm';
import EditButton from 'components/buttons/EditButton';
import EmptyListCaption from 'components/EmptyListCaption';
import PreLoading from 'components/PreLoading';
import SubTitle from 'components/SubTitle';
import Title from 'components/Title';
import { TaskDto } from 'models/task';
import { FC, useCallback, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { formatRuDateTime } from 'utils/date';
import { defaultErrorEnqueue } from 'utils/errorProcessor';
import {
  useMySnackbar,
  useParamSelector,
  useDocumentTitle,
  useBackLocation,
} from 'utils/hooks';

const TaskParam: FC<{
  name: string;
  value?: string | number | null;
}> = ({ name, value }) => (
  <Grid container>
    <Grid item xs>
      <Typography variant="body1">{name}</Typography>
    </Grid>
    <Grid item>
      <Chip label={value} />
    </Grid>
  </Grid>
);

export interface TaskPageProps {
  readonly?: boolean;
}

const TaskPage = ({ readonly = false }: TaskPageProps) => {
  const params = useParams();

  const courseId = Number(params.courseId);
  const taskId = Number(params.taskId);

  const dispatch = useAppDispatch();
  const { enqueueError, enqueueSuccess } = useMySnackbar();
  const loadingAction = useCallback(async () => {
    try {
      await dispatch(getCourseByIdThunk({ courseId })).then(unwrapResult);
      await dispatch(getCriteriaByTaskIdThunk({ taskId })).then(unwrapResult);
      return await dispatch(getTaskByIdThunk({ taskId })).then(unwrapResult);
    } catch (e) {
      defaultErrorEnqueue(e as Error, enqueueError);
    }
  }, [courseId, taskId, dispatch, enqueueError]);

  const course = useParamSelector(courseByIdSelector, { courseId });
  const task = useParamSelector(taskByIdSelector, { taskId }) as
    | TaskDto
    | undefined;
  const normalizedCriteria = useParamSelector(
    normalizedCriteriaByTaskSelector,
    { taskId }
  );
  useDocumentTitle(
    course != null && task != null
      ? `${task.title} - ${course.name}`
      : '???????????????? ??????????????'
  );
  const description = useMemo(
    () =>
      task?.description?.split('\n').map((s) => (
        <>
          {s}
          <br />
        </>
      )),
    [task?.description]
  );

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const handleEditClick = useCallback(
    () => navigate(`${pathname}/edit`),
    [navigate, pathname]
  );
  const backPathname = useBackLocation();
  const handleDelete = useCallback(async () => {
    try {
      await dispatch(deleteTaskThunk({ taskId })).then(unwrapResult);
      enqueueSuccess(
        task != null ? `?????????????? ${task.title} ??????????????` : '?????????????? ??????????????'
      );
      navigate(backPathname, { replace: true });
    } catch (e) {
      defaultErrorEnqueue(e as Error, enqueueError);
    }
  }, [
    backPathname,
    dispatch,
    enqueueError,
    enqueueSuccess,
    navigate,
    task,
    taskId,
  ]);

  return (
    <Paper sx={{ p: 2 }}>
      <Container>
        <PreLoading action={loadingAction}>
          <Grid container spacing={2} sx={{ pt: 2 }}>
            <Grid item>
              <BackButton />
            </Grid>
            <Grid item xs>
              <Title>{task?.title}</Title>
            </Grid>
            {!readonly && (
              <Grid item>
                <EditButton onClick={handleEditClick} />
              </Grid>
            )}
            {!readonly && (
              <Grid item>
                <DeleteButtonWithConfirm
                  onDelete={handleDelete}
                  dialogTitle={`?????????????? ?????????????? ${task?.title}`}
                  dialogDescription="?????? ???????????????? ???????????????????? ?? ???????????????? ?? ???????????????? ???????? ???????????? ?????????? ??????????????"
                />
              </Grid>
            )}
          </Grid>
          <Divider sx={{ pt: 2, mb: 2 }} />
          <SubTitle>????????????????</SubTitle>
          <Typography variant="body1" overflow="scroll" gutterBottom>
            {description}
          </Typography>
          <Divider sx={{ pt: 2, mb: 2 }} />
          <SubTitle>????????????????????????????</SubTitle>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TaskParam
                name="???????????????????????? ???????????????????? ????????????"
                value={task?.maxScore}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TaskParam
                name="?????????????? ?????????????? ???? ???????????? ?????????? ?????????????????"
                value={task?.deadlinesEnabled ? '????' : '??????'}
              />
            </Grid>
            {task?.softDeadlineAt != null && (
              <Grid item xs={12} md={6}>
                <TaskParam
                  name="???????????? ?????????????? ????????"
                  value={formatRuDateTime(task.softDeadlineAt)}
                />
              </Grid>
            )}
            {task?.hardDeadlineAt != null && (
              <Grid item xs={12} md={6}>
                <TaskParam
                  name="?????????????? ?????????????? ????????"
                  value={formatRuDateTime(task.hardDeadlineAt)}
                />
              </Grid>
            )}
            {task?.deadlinesEnabled && (
              <Grid item xs={12}>
                <TaskParam
                  name="???????????????????????? ?????????? ???????????? ???? ?????????? ??????????"
                  value={`${task?.maxPenaltyPercent}%`}
                />
              </Grid>
            )}
          </Grid>
          <Divider sx={{ pt: 2, mb: 2 }} />
          <SubTitle>???????????????? ????????????????????</SubTitle>
          <Grid container spacing={2}>
            {normalizedCriteria.map(({ id, name, criteriaPercent }) => (
              <Grid
                key={id}
                item
                xs={12}
                container
                spacing={1}
                justifyContent="space-between"
              >
                <Grid item xs>
                  <Typography variant="subtitle1">{name}</Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    {Math.round(criteriaPercent * (task?.maxScore ?? 0)) / 100}/
                    {task?.maxScore}
                  </Typography>
                </Grid>
              </Grid>
            ))}
            {normalizedCriteria.length === 0 && <EmptyListCaption />}
          </Grid>
        </PreLoading>
      </Container>
    </Paper>
  );
};

export default TaskPage;
