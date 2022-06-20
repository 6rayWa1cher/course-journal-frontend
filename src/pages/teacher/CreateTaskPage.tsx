import { yupResolver } from '@hookform/resolvers/yup';
import { Paper, Container, Grid, Divider, LinearProgress } from '@mui/material';
import { courseByIdSelector, getCourseByIdThunk } from '@redux/courses';
import {
  CreateTaskWithCriteriaArgs,
  createTaskWithCriteriaThunk,
} from '@redux/tasks';
import { useAppDispatch } from '@redux/utils';
import { unwrapResult } from '@reduxjs/toolkit';
import BackButton from 'components/buttons/BackButton';
import ClearSubmitButtons from 'components/ClearSubmitButtons';
import TaskForm from 'components/forms/TaskForm';
import PreLoading from 'components/PreLoading';
import Title from 'components/Title';
import { pick } from 'lodash';
import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { defaultErrorEnqueue } from 'utils/errorProcessor';
import {
  useDocumentTitle,
  useLoadingActionThunk,
  useMySnackbar,
  useParamSelector,
} from 'utils/hooks';
import { createTaskSchema, CreateTaskSchemaType } from 'validation/yup/task';

const CreateTaskPage = () => {
  const params = useParams();

  const courseId = Number(params.courseId);

  const thunk = useCallback(() => getCourseByIdThunk({ courseId }), [courseId]);
  const loadingAction = useLoadingActionThunk(thunk);

  const course = useParamSelector(courseByIdSelector, { courseId });
  useDocumentTitle(
    course != null
      ? `Создание задания для курса ${course.name}`
      : 'Создание задания'
  );

  const methods = useForm<CreateTaskSchemaType>({
    resolver: yupResolver(createTaskSchema),
    mode: 'all',
    defaultValues: {
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
  } = methods;

  const dispatch = useAppDispatch();
  const { enqueueError, enqueueSuccess } = useMySnackbar();
  const navigate = useNavigate();
  const onSubmit = useCallback(
    async (data: CreateTaskSchemaType) => {
      try {
        const req: CreateTaskWithCriteriaArgs = {
          task: {
            ...pick(data, [
              'title',
              'description',
              'maxScore',
              'announced',
              'deadlinesEnabled',
              'maxPenaltyPercent',
            ]),
            course: courseId,
            softDeadlineAt: data.softDeadlineAt?.toISOString(),
            hardDeadlineAt: data.hardDeadlineAt?.toISOString(),
          },
          criteria: data.criteria,
        };
        const { task } = await dispatch(createTaskWithCriteriaThunk(req)).then(
          unwrapResult
        );
        const taskId = task.id;
        enqueueSuccess(`Задание ${task.title} создано`);
        navigate(`/courses/${courseId}/tasks/${taskId}`);
        return task;
      } catch (e) {
        defaultErrorEnqueue(e as Error, enqueueError);
      }
    },
    [courseId, dispatch, enqueueError, enqueueSuccess, navigate]
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
                    <Title>Создание задания для курса {course?.name}</Title>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                  <TaskForm />
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                  <ClearSubmitButtons />
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

export default CreateTaskPage;
