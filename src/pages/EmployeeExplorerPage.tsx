import { Grid, Pagination, Paper } from '@mui/material';
import { getEmployeesThunk } from '@redux/employees';
import { useAppDispatch } from '@redux/utils';
import { unwrapResult } from '@reduxjs/toolkit';
import { EmployeeDto } from 'models/employee';
import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { defaultErrorEnqueue } from 'utils/errorProcessor';
import {
  useDocumentTitle,
  useMySnackbar,
  useNumberSearchState,
} from 'utils/hooks';
import { getFirstCapitalSymbols, getFullName } from 'utils/string';
import Title from 'components/Title';
import { Page } from 'api/types';
import AddButton from 'components/buttons/AddButton';
import PreLoading from 'components/PreLoading';
import NavListWithAvatars from 'components/NavListWithAvatars';

const EmployeeExplorerPage = () => {
  useDocumentTitle('Преподаватели');
  const [page, setPage] = useNumberSearchState('page');
  const clearedPage = page ?? 1;
  const [pages, setPages] = useState(1);
  const { enqueueError } = useMySnackbar();
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<Page<EmployeeDto> | null>(null);
  const loadingAction = useCallback(
    () =>
      dispatch(
        getEmployeesThunk({
          page: clearedPage - 1,
          sort: [
            { key: 'middleName' },
            { key: 'firstName' },
            { key: 'lastName' },
          ],
        })
      )
        .then(unwrapResult)
        .then((v) => {
          setPages(v.totalPages);
          setValue(v);
          return v;
        })
        .catch((e) => {
          defaultErrorEnqueue(e, enqueueError);
        }),
    [dispatch, clearedPage, enqueueError]
  );

  const navigate = useNavigate();
  const handleAddClick = useCallback(
    () => navigate(`/employees/create`),
    [navigate]
  );
  const handleChangePage = useCallback(
    (event: React.ChangeEvent<unknown>, newPage: number) => {
      if (page === newPage) return;
      setPage(newPage);
    },
    [page, setPage]
  );

  const items = useMemo(
    () =>
      value?.content.map((v) => ({
        id: v.id,
        name: getFullName(v),
        link: `/employees/${v.id}`,
        avatar: getFirstCapitalSymbols(getFullName(v), 2),
      })) ?? [],
    [value]
  );

  return (
    <Paper sx={{ p: 2 }}>
      <Grid container justifyContent="space-between" spacing={2}>
        <Grid item>
          <Title>Преподаватели</Title>
        </Grid>
        <Grid item>
          <AddButton onClick={handleAddClick} />
        </Grid>
      </Grid>
      <PreLoading action={loadingAction}>
        <NavListWithAvatars items={items} />
      </PreLoading>
      <Grid container justifyContent="center">
        <Grid item>
          <Pagination
            count={pages}
            page={clearedPage}
            onChange={handleChangePage}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default EmployeeExplorerPage;
