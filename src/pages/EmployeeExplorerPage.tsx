import {
  Avatar,
  Grid,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Pagination,
  Paper,
  Typography,
} from '@mui/material';
import { getEmployeesThunk } from '@redux/employees';
import { useAppDispatch } from '@redux/utils';
import { unwrapResult } from '@reduxjs/toolkit';
import { EmployeeDto } from 'models/employee';
import { useCallback, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { defaultErrorEnqueue } from 'utils/errorProcessor';
import { useDocumentTitle, useLoadingPlain, useMySnackbar } from 'utils/hooks';
import { getFirstCapitalSymbols } from 'utils/string';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AddIcon from '@mui/icons-material/Add';
import Title from 'components/Title';
import { Page } from 'api/types';

const EmployeeExplorerPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  useDocumentTitle('Преподаватели');
  const page = Number(searchParams.get('page') ?? '1');
  const setPage = useCallback(
    (p: number) => setSearchParams({ ...searchParams, page: p.toString() }),
    [searchParams, setSearchParams]
  );
  const [pages, setPages] = useState(1);
  const { enqueueError } = useMySnackbar();
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<Page<EmployeeDto> | null>(null);
  const action = useCallback(
    () =>
      dispatch(getEmployeesThunk({ page: page - 1 }))
        .then(unwrapResult)
        .then((v) => {
          setPages(v.totalPages);
          setValue(v);
          return v;
        })
        .catch((e) => {
          defaultErrorEnqueue(e, enqueueError);
        }),
    [dispatch, page, enqueueError]
  );
  const { loading } = useLoadingPlain(action);

  const navigate = useNavigate();
  const handleItemClick = useCallback(
    (id: number) => navigate(`/employees/${id}`),
    [navigate]
  );
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

  return (
    <Paper sx={{ p: 2 }}>
      <Grid container justifyContent="space-between" spacing={2}>
        <Grid item>
          <Title>Преподаватели</Title>
        </Grid>
        <Grid item>
          <IconButton onClick={handleAddClick}>
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>
      {!value?.empty && (
        <List>
          {value?.content.map(({ id, firstName, middleName, lastName }) => {
            const fullName = [lastName, firstName, middleName].join(' ');
            const handleClick = () => handleItemClick(id);
            return (
              <ListItem
                key={id}
                secondaryAction={
                  <IconButton onClick={handleClick}>
                    <NavigateNextIcon />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton onClick={handleClick}>
                  <ListItemAvatar>
                    <Avatar>{getFirstCapitalSymbols(fullName, 2)}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={fullName} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      )}
      {value?.empty && !loading && (
        <Typography display="block" variant="caption" align="center">
          Список пуст
        </Typography>
      )}
      <Grid container justifyContent="center">
        <Grid item>
          <Pagination count={pages} page={page} onChange={handleChangePage} />
        </Grid>
      </Grid>
      {loading && <LinearProgress />}
    </Paper>
  );
};

export default EmployeeExplorerPage;
