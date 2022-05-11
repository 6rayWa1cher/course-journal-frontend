import { yupResolver } from '@hookform/resolvers/yup';
import {
  Container,
  Divider,
  Grid,
  LinearProgress,
  Paper,
  Typography,
} from '@mui/material';
import { createCourseThunk } from '@redux/courses';
import { groupByIdSelector } from '@redux/groups';
import {
  groupsByStudentsSelector,
  selfEmployeeSelector,
} from '@redux/selector';
import { studentsByIdsSelector } from '@redux/students';
import { isSerializedAxiosError, useAppDispatch } from '@redux/utils';
import { unwrapResult } from '@reduxjs/toolkit';
import BackButton from 'components/buttons/BackButton';
import ClearSubmitButtons from 'components/ClearSubmitButtons';
import FormTextField from 'components/FormTextField';
import SubTitle from 'components/SubTitle';
import Title from 'components/Title';
import { GroupId } from 'models/group';
import { StudentDto } from 'models/student';
import { useCallback, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { defaultErrorEnqueue } from 'utils/errorProcessor';
import {
  useDocumentTitle,
  useMySnackbar,
  useParamSelector,
  useTypedSelector,
} from 'utils/hooks';
import { formatFullNameWithInitials } from 'utils/string';
import {
  CreateCourseSchemaType,
  createCourseSchema,
} from 'validation/yup/course';
import GroupSelector from './GroupSelector';
import StudentPicker from './StudentPicker';

const CreateCoursePage = () => {
  useDocumentTitle('Создание курса');
  const employee = useTypedSelector(selfEmployeeSelector);
  const employeeId = employee?.id ?? -1;

  const methods = useForm<CreateCourseSchemaType>({
    resolver: yupResolver(createCourseSchema),
    mode: 'all',
    defaultValues: {
      name: '',
      students: [],
    },
  });
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    watch,
  } = methods;

  const dispatch = useAppDispatch();
  const { enqueueSuccess, enqueueError } = useMySnackbar();
  const navigate = useNavigate();
  const onSubmit = useCallback(
    async (data: CreateCourseSchemaType) => {
      try {
        const course = await dispatch(
          createCourseThunk({ ...data, owner: employeeId })
        ).then(unwrapResult);
        const courseId = course.id;
        enqueueSuccess(`Курс ${data.name} создан`);
        navigate(`/courses/${courseId}`);
        return course;
      } catch (e) {
        if (isSerializedAxiosError(e) && e.response?.status === 409) {
          enqueueError('Курс с таким названием уже существует');
        } else {
          defaultErrorEnqueue(e as Error, enqueueError);
        }
      }
    },
    [dispatch, employeeId, enqueueError, enqueueSuccess, navigate]
  );

  const [groupId, setGroupId] = useState<GroupId | null>(null);
  const selectedGroup = useParamSelector(groupByIdSelector, {
    groupId: groupId ?? -1,
  });

  const studentIds = watch('students');

  const selectedGroups = useParamSelector(groupsByStudentsSelector, {
    ids: studentIds,
  });

  const students = useParamSelector(studentsByIdsSelector, {
    ids: studentIds,
  });

  const selectedStudentsText = useMemo(
    () =>
      selectedGroups
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((g) => {
          const selectedStudents = students.filter(
            (s): s is StudentDto => s?.group === g.id
          );
          const mappedStudents = selectedStudents.map((s) =>
            formatFullNameWithInitials(s)
          );
          return [g.id, `${g.name}: ${mappedStudents.join(', ')}`];
        })
        .map(([id, text]) => (
          <Typography key={id} variant="body1">
            {text}
          </Typography>
        )),
    [selectedGroups, students]
  );

  return (
    <Paper sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item>
          <BackButton to="/courses" />
        </Grid>
        <Grid item>
          <Title>Создание курса</Title>
        </Grid>
      </Grid>
      <Container>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormTextField
              name="name"
              control={control}
              variant="standard"
              margin="normal"
              label="Название"
              type="text"
              fullWidth
              required
            />
            <Divider sx={{ pt: 2 }} />
            <Grid container spacing={2} sx={{ p: 2 }}>
              <Grid item xs={12}>
                <SubTitle>Подбор студентов</SubTitle>
              </Grid>
              <Grid item xs={12} md={6}>
                <GroupSelector groupId={groupId} setGroupId={setGroupId} />
              </Grid>
              {groupId != null && selectedGroup != null && (
                <Grid item xs={12} md={6}>
                  <Typography component="h3" variant="h6">
                    Студенты {selectedGroup.name} группы
                  </Typography>
                  <StudentPicker groupId={groupId} />
                </Grid>
              )}
              <Grid item xs={12}>
                <Typography component="h3" variant="h6">
                  Выбранные студенты
                </Typography>
              </Grid>
              <Grid item xs={12}>
                {selectedStudentsText}
              </Grid>
            </Grid>
            <Divider sx={{ pt: 2 }} />
            <ClearSubmitButtons />
            {isSubmitting && <LinearProgress />}
          </form>
        </FormProvider>
      </Container>
    </Paper>
  );
};

export default CreateCoursePage;
