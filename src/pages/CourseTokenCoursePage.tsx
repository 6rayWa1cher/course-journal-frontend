import { Paper, Container, Grid } from '@mui/material';
import { courseByIdSelector, getCourseByIdThunk } from '@redux/courses';
import CardLink from 'components/CardLink';
import PreLoading from 'components/PreLoading';
import Title from 'components/Title';
import { useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import {
  useDocumentTitle,
  useLoadingActionThunk,
  useParamSelector,
} from 'utils/hooks';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

const CourseTokenCoursePage = () => {
  const params = useParams();

  const token = params.token;
  const courseId = Number(params.courseId);

  const thunk = useCallback(() => getCourseByIdThunk({ courseId }), [courseId]);
  const loadingAction = useLoadingActionThunk(thunk);
  const course = useParamSelector(courseByIdSelector, { courseId });

  useDocumentTitle(course?.name ?? 'Курс');

  const buttonItems = useMemo(
    () => [
      {
        title: 'Оценки',
        link: `/ct/${token}/courses/${courseId}/submissions`,
        Icon: TaskAltIcon,
      },
      {
        title: 'Задания',
        link: `/ct/${token}/courses/${courseId}/tasks`,
        Icon: AssignmentIcon,
      },
    ],
    [token, courseId]
  );

  return (
    <>
      <Paper sx={{ p: 2 }}>
        <Container>
          <PreLoading action={loadingAction}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Title>{course?.name}</Title>
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

export default CourseTokenCoursePage;
