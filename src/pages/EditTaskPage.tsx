import { yupResolver } from '@hookform/resolvers/yup';
import { Paper, Container, Grid, Divider, LinearProgress } from '@mui/material';
import { courseByIdSelector, getCourseByIdThunk } from '@redux/courses';
import {
  criteriaByTaskSelector,
  getCriteriaByTaskIdThunk,
} from '@redux/criteria';
import {
  getTaskByIdThunk,
  PutTaskWithCriteriaArgs,
  putTaskWithCriteriaThunk,
  taskByIdSelector,
} from '@redux/tasks';
import { useAppDispatch } from '@redux/utils';
import { unwrapResult } from '@reduxjs/toolkit';
import BackButton from 'components/buttons/BackButton';
import ClearSubmitButtons from 'components/ClearSubmitButtons';
import TaskForm from 'components/forms/TaskForm';
import PreLoading from 'components/PreLoading';
import Title from 'components/Title';
import { pick } from 'lodash';
import { useCallback, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { defaultErrorEnqueue } from 'utils/errorProcessor';
import { useDocumentTitle, useMySnackbar, useParamSelector } from 'utils/hooks';
import { editTaskSchema, EditTaskSchemaType } from 'validation/yup/task';

const EditTaskPage = () => {
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
  useDocumentTitle(
    course != null
      ? `Редактирование задания для курса ${course.name}`
      : 'Редактирование задания'
  );

  const methods = useForm<EditTaskSchemaType>({
    resolver: yupResolver(editTaskSchema),
    mode: 'all',
    defaultValues: {
      course: undefined,
      taskNumber: undefined,
      title: '',
      description: undefined,
      maxScore: undefined,
      criteria: [{ name: 'Выполнение задания', criteriaPercent: 100 }],
      announced: true,
      deadlinesEnabled: false,
      maxPenaltyPercent: undefined,
      softDeadlineAt: undefined,
      hardDeadlineAt: undefined,
    },
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  const task = useParamSelector(taskByIdSelector, { taskId });
  const criteria = useParamSelector(criteriaByTaskSelector, { taskId });
  useEffect(
    () =>
      reset({
        course: courseId,
        title: task?.title,
        taskNumber: task?.taskNumber ?? undefined,
        description:
          task != null && 'description' in task
            ? task.description ?? undefined
            : undefined,
        maxScore: task?.maxScore ?? undefined,
        criteria,
        announced: task?.announced ?? true,
        deadlinesEnabled: task?.deadlinesEnabled ?? false,
        maxPenaltyPercent: task?.maxPenaltyPercent ?? undefined,
        softDeadlineAt:
          task?.softDeadlineAt != null
            ? new Date(task?.softDeadlineAt)
            : undefined,
        hardDeadlineAt:
          task?.hardDeadlineAt != null
            ? new Date(task?.hardDeadlineAt)
            : undefined,
      }),
    [task, criteria, courseId, reset]
  );

  const onSubmit = useCallback(
    async (data: EditTaskSchemaType) => {
      try {
        const req: PutTaskWithCriteriaArgs = {
          task: {
            ...pick(data, [
              'course',
              'title',
              'taskNumber',
              'description',
              'maxScore',
              'announced',
              'deadlinesEnabled',
              'maxPenaltyPercent',
            ]),
            softDeadlineAt: data.softDeadlineAt?.toISOString(),
            hardDeadlineAt: data.hardDeadlineAt?.toISOString(),
          },
          criteria: data.criteria,
          taskId,
        };
        const { task } = await dispatch(putTaskWithCriteriaThunk(req)).then(
          unwrapResult
        );
        enqueueSuccess(`Задание ${task.title} изменено`);
        return task;
      } catch (e) {
        defaultErrorEnqueue(e as Error, enqueueError);
      }
    },
    [dispatch, enqueueError, enqueueSuccess, taskId]
  );

  return (
    <Paper sx={{ p: 2 }}>
      <Container>
        <PreLoading action={loadingAction}>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12} container spacing={2}>
                  <Grid item>
                    <BackButton to={`/courses/${courseId}/tasks`} />
                  </Grid>
                  <Grid item xs>
                    <Title>Изменение задания для курса {course?.name}</Title>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                  <TaskForm />
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                  <ClearSubmitButtons submitLabel="Сохранить" />
                  {isSubmitting && <LinearProgress />}
                </Grid>
              </Grid>
            </form>
          </FormProvider>
        </PreLoading>
      </Container>
    </Paper>
  );
};

export default EditTaskPage;
