import { yupResolver } from '@hookform/resolvers/yup';
import { Paper, Container, Grid, Divider, LinearProgress } from '@mui/material';
import { courseByIdSelector, getCourseByIdThunk } from '@redux/courses';
import BackButton from 'components/buttons/BackButton';
import ClearSubmitButtons from 'components/ClearSubmitButtons';
import TaskForm from 'components/forms/TaskForm';
import PreLoading from 'components/PreLoading';
import Title from 'components/Title';
import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import {
  useDocumentTitle,
  useLoadingActionThunk,
  useParamSelector,
} from 'utils/hooks';
import {
  CreateCourseSchemaType,
  createCourseSchema,
} from 'validation/yup/course';
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
    control,
    formState: { isSubmitting },
    watch,
  } = methods;

  const onSubmit = useCallback(
    (data: CreateTaskSchemaType) => console.log('submitted', data),
    []
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
