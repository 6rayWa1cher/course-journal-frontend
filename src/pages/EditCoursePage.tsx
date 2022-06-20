import { yupResolver } from '@hookform/resolvers/yup';
import { Container, Divider, Grid, LinearProgress, Paper } from '@mui/material';
import {
  courseByIdSelector,
  getCourseByIdThunk,
  putCourseThunk,
} from '@redux/courses';
import { getGroupsByCourseIdThunk } from '@redux/groups';
import { selfEmployeeSelector } from '@redux/selector';
import { getAllStudentsByCourseIdThunk } from '@redux/students';
import { isSerializedAxiosError, useAppDispatch } from '@redux/utils';
import { unwrapResult } from '@reduxjs/toolkit';
import BackButton from 'components/buttons/BackButton';
import ClearSubmitButtons from 'components/ClearSubmitButtons';
import CourseForm from 'components/forms/CourseForm';
import PreLoading from 'components/PreLoading';
import Title from 'components/Title';
import { CourseFullDto } from 'models/course';
import { useCallback, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { defaultErrorEnqueue } from 'utils/errorProcessor';
import {
  useDocumentTitle,
  useMySnackbar,
  useParamSelector,
  useTypedSelector,
} from 'utils/hooks';
import { editCourseSchema, EditCourseSchemaType } from 'validation/yup/course';

const EditCoursePage = () => {
  const params = useParams();

  const courseId = Number(params.courseId);
  const course = useParamSelector(courseByIdSelector, { courseId });

  useDocumentTitle(
    course != null
      ? `Редактирование курса - ${course?.name}`
      : 'Редактирование курса'
  );
  const employee = useTypedSelector(selfEmployeeSelector);
  const employeeId = employee?.id ?? -1;

  const getDefaultValues = useCallback(() => {
    if (course != null) {
      return {
        courseId: course.id,
        name: course.name,
        students: (course as CourseFullDto).students ?? [],
      };
    } else {
      return {
        name: '',
        students: [],
        courseId,
      };
    }
  }, [course, courseId]);

  const methods = useForm<EditCourseSchemaType>({
    resolver: yupResolver(editCourseSchema),
    mode: 'all',
    defaultValues: getDefaultValues(),
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  useEffect(() => reset(getDefaultValues()), [reset, getDefaultValues, course]);

  const dispatch = useAppDispatch();
  const { enqueueSuccess, enqueueError } = useMySnackbar();
  const onSubmit = useCallback(
    async (data: EditCourseSchemaType) => {
      try {
        const course = await dispatch(
          putCourseThunk({ courseId, data: { ...data, owner: employeeId } })
        ).then(unwrapResult);
        enqueueSuccess(`Курс ${data.name} сохранен`);
        return course;
      } catch (e) {
        if (isSerializedAxiosError(e) && e.response?.status === 409) {
          enqueueError('Курс с таким названием уже существует');
        } else {
          defaultErrorEnqueue(e as Error, enqueueError);
        }
      }
    },
    [courseId, dispatch, employeeId, enqueueError, enqueueSuccess]
  );

  const loadingAction = useCallback(async () => {
    try {
      await dispatch(getCourseByIdThunk({ courseId })).then(unwrapResult);
      await dispatch(getAllStudentsByCourseIdThunk({ courseId })).then(
        unwrapResult
      );
      return await dispatch(getGroupsByCourseIdThunk({ courseId })).then(
        unwrapResult
      );
    } catch (e) {
      defaultErrorEnqueue(e as Error, enqueueError);
    }
  }, [courseId, dispatch, enqueueError]);

  return (
    <Paper sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item>
          <BackButton to={`/courses/${courseId}`} />
        </Grid>
        <Grid item>
          <Title>Редактирование курса</Title>
        </Grid>
      </Grid>
      <Container>
        <PreLoading action={loadingAction}>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CourseForm />
              <Divider sx={{ pt: 2 }} />
              <ClearSubmitButtons submitLabel="Сохранить" />
              {isSubmitting && <LinearProgress />}
            </form>
          </FormProvider>
        </PreLoading>
      </Container>
    </Paper>
  );
};

export default EditCoursePage;
