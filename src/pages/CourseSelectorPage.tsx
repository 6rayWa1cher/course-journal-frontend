import { Paper, Container } from '@mui/material';
import {
  coursesByEmployeeIdSelector,
  getCourseByEmployeePageThunk,
} from '@redux/courses';
import { selfEmployeeSelector } from '@redux/selector';
import NavListWithAvatars from 'components/NavListWithAvatars';
import PreLoading from 'components/PreLoading';
import { debounce } from 'lodash';
import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  useLoadingActionThunk,
  useNumberSearchState,
  useParamSelector,
  useStringSearchState,
  useTypedSelector,
} from 'utils/hooks';
import { useDebounce } from 'utils/hooks/lodash';
import { getFirstCapitalSymbols } from 'utils/string';

const CourseSelectorPage = () => {
  const employee = useTypedSelector(selfEmployeeSelector);
  const employeeId = employee?.id ?? -1;

  const [search, setSearch] = useStringSearchState('search');
  const [page, setPage] = useNumberSearchState('page');
  const setSearchDebounced = useDebounce(setSearch, 200);
  const setPageDebounced = useDebounce(setPage, 200);

  const thunk = useCallback(
    () =>
      getCourseByEmployeePageThunk({
        name: search != null && search.length > 0 ? search : undefined,
        employeeId,
        pagination: {
          page: page ?? 0,
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

  return (
    <Paper>
      <Container>
        <PreLoading action={loadingAction}>
          <NavListWithAvatars items={items} />
        </PreLoading>
      </Container>
    </Paper>
  );
};

export default CourseSelectorPage;
