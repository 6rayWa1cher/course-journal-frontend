import { Paper, Container, Grid, Pagination } from '@mui/material';
import {
  coursesByEmployeeIdSelector,
  getCourseByEmployeePageThunk,
} from '@redux/courses';
import { selfEmployeeSelector } from '@redux/selector';
import AddButton from 'components/buttons/AddButton';
import NavListWithAvatars from 'components/NavListWithAvatars';
import PreLoading from 'components/PreLoading';
import Title from 'components/Title';
import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useDocumentTitle,
  useLoadingActionThunk,
  useNumberSearchState,
  useParamSelector,
  useStringSearchState,
  useTypedSelector,
} from 'utils/hooks';
import { useDebounce } from 'utils/hooks/lodash';
import { getFirstCapitalSymbols } from 'utils/string';

const CourseSelectorPage = () => {
  useDocumentTitle('Курсы');
  const employee = useTypedSelector(selfEmployeeSelector);
  const employeeId = employee?.id ?? -1;

  const [search, setSearch] = useStringSearchState('search');
  const [page, setPage] = useNumberSearchState('page');
  const setSearchDebounced = useDebounce(setSearch, 200);
  const setPageDebounced = useDebounce(setPage, 200);

  const handlePageChange = useCallback(
    (_: React.ChangeEvent<unknown>, page: number) => setPageDebounced(page),
    [setPageDebounced]
  );

  const thunk = useCallback(
    () =>
      getCourseByEmployeePageThunk({
        name: search != null && search.length > 0 ? search : undefined,
        employeeId,
        pagination: {
          page: page != null ? page - 1 : 0,
          size: 50,
          sort: [{ key: 'name', dir: 'asc' }],
        },
      }),
    [employeeId, page, search]
  );
  const loadingAction = useLoadingActionThunk(thunk);

  const courses = useParamSelector(coursesByEmployeeIdSelector, { employeeId });

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
          action={loadingAction}
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

export default CourseSelectorPage;
