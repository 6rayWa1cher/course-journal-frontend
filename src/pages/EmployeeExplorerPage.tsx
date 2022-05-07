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
} from '@mui/material';
import { getEmployeesThunk } from '@redux/employees';
import { useAppDispatch } from '@redux/utils';
import { unwrapResult } from '@reduxjs/toolkit';
import { EmployeeDto } from 'models/employee';
import { useCallback, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { defaultErrorEnqueue } from 'utils/errorProcessor';
import {
  useDocumentTitle,
  useLoadingPlain,
  useMySnackbar,
  useNumberSearchState,
} from 'utils/hooks';
import { getFirstCapitalSymbols } from 'utils/string';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AddIcon from '@mui/icons-material/Add';
import Title from 'components/Title';
import { Page } from 'api/types';
import EmptyListCaption from 'components/EmptyListCaption';

const EmployeeExplorerPage = () => {
  useDocumentTitle('Преподаватели');
  const [page, setPage] = useNumberSearchState('page');
  const clearedPage = page ?? 1;
  const [pages, setPages] = useState(1);
  const { enqueueError } = useMySnackbar();
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<Page<EmployeeDto> | null>(null);
  const action = useCallback(
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
      {value?.empty && !loading && <EmptyListCaption />}
      <Grid container justifyContent="center">
        <Grid item>
          <Pagination
            count={pages}
            page={clearedPage}
            onChange={handleChangePage}
          />
        </Grid>
      </Grid>
      {loading && <LinearProgress />}
    </Paper>
  );
};

export default EmployeeExplorerPage;
