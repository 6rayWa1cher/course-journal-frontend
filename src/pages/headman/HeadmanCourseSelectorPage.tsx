import { Paper, Container, Grid, Pagination } from '@mui/material';
import { getCourseByGroupPageThunk } from '@redux/courses';
import { coursesByGroupIdSelector, selfStudentSelector } from '@redux/selector';
import { getStudentsByGroupIdThunk } from '@redux/students';
import { unwrapResult } from '@reduxjs/toolkit';
import AddButton from 'components/buttons/AddButton';
import NavListWithAvatars from 'components/NavListWithAvatars';
import PreLoading from 'components/PreLoading';
import Title from 'components/Title';
import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { defaultErrorEnqueue } from 'utils/errorProcessor';
import {
  useDocumentTitle,
  useMySnackbar,
  useNumberSearchState,
  useParamSelector,
  useTypedDispatch,
  useTypedSelector,
} from 'utils/hooks';
import { useDebounce } from 'utils/hooks/lodash';
import { getFirstCapitalSymbols } from 'utils/string';

const HeadmanCourseSelectorPage = () => {
  useDocumentTitle('Курсы');
  const student = useTypedSelector(selfStudentSelector);
  const groupId = student?.group as number;

  const [page, setPage] = useNumberSearchState('page');
  const setPageDebounced = useDebounce(setPage, 200);

  const handlePageChange = useCallback(
    (_: React.ChangeEvent<unknown>, page: number) => setPageDebounced(page),
    [setPageDebounced]
  );

  const dispatch = useTypedDispatch();

  const { enqueueError } = useMySnackbar();

  const mainLoadingAction = useCallback(async () => {
    try {
      await dispatch(getStudentsByGroupIdThunk({ groupId })).then(unwrapResult);
      return await dispatch(
        getCourseByGroupPageThunk({
          groupId,
          pagination: {
            page: page != null ? page - 1 : 0,
            size: 50,
            sort: [{ key: 'name', dir: 'asc' }],
          },
        })
      ).then(unwrapResult);
    } catch (e) {
      defaultErrorEnqueue(e as Error, enqueueError);
    }
  }, [groupId, page, dispatch, enqueueError]);

  const courses = useParamSelector(coursesByGroupIdSelector, { groupId });

  const items = useMemo(
    () =>
      courses?.map((c) => ({
        id: c.id,
        name: c.name,
        link: `/courses/${c.id}`,
        avatar: getFirstCapitalSymbols(c.name, 2),
      })),
    [courses]
  );

  const navigate = useNavigate();
  const handleAddClick = useCallback(
    () => navigate('/courses/create'),
    [navigate]
  );

  return (
    <Paper sx={{ p: 2 }}>
      <Container>
        <PreLoading
          action={mainLoadingAction}
          render={({ totalPages }) => (
            <>
              <Grid container justifyContent="space-between" spacing={2}>
                <Grid item>
                  <Title>Курсы</Title>
                </Grid>
                <Grid item>
                  <AddButton onClick={handleAddClick} />
                </Grid>
              </Grid>
              <NavListWithAvatars items={items} />
              <Grid container justifyContent="center">
                <Grid item>
                  <Pagination
                    count={totalPages}
                    page={page ?? 1}
                    onChange={handlePageChange}
                  />
                </Grid>
              </Grid>
            </>
          )}
        />
      </Container>
    </Paper>
  );
};

export default HeadmanCourseSelectorPage;
