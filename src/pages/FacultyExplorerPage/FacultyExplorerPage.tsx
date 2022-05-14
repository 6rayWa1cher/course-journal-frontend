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
  Paper,
  Typography,
} from '@mui/material';
import { useAppDispatch } from '@redux/utils';
import { unwrapResult } from '@reduxjs/toolkit';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { defaultErrorEnqueue } from 'utils/errorProcessor';
import { useDocumentTitle, useLoadingPlain, useMySnackbar } from 'utils/hooks';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AddIcon from '@mui/icons-material/Add';
import Title from 'components/Title';
import { getAllFacultiesThunk } from '@redux/faculties';
import CreateFacultyDialog from './CreateFacultyDialog';

const FacultyExplorerPage = () => {
  useDocumentTitle('Факультеты');
  const { enqueueError } = useMySnackbar();
  const dispatch = useAppDispatch();
  const action = useCallback(
    () =>
      dispatch(getAllFacultiesThunk())
        .then(unwrapResult)
        .catch((e) => {
          defaultErrorEnqueue(e, enqueueError);
        }),
    [dispatch, enqueueError]
  );
  const { loading, value } = useLoadingPlain(action);

  const navigate = useNavigate();
  const handleItemClick = useCallback(
    (id: number) => navigate(`/faculties/${id}`),
    [navigate]
  );

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const handleAddClick = useCallback(
    () => setOpenAddDialog(true),
    [setOpenAddDialog]
  );
  const empty = value?.length == null || value.length === 0;

  return (
    <Paper sx={{ p: 2 }}>
      <Grid container justifyContent="space-between" spacing={2}>
        <Grid item>
          <Title>Факультеты</Title>
        </Grid>
        <Grid item>
          <IconButton onClick={handleAddClick}>
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>
      {!empty && (
        <List>
          {value?.map(({ id, name }) => {
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
                    <Avatar>{name.charAt(0)}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={name} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      )}
      {empty && !loading && (
        <Typography display="block" variant="caption" align="center">
          Список пуст
        </Typography>
      )}
      <CreateFacultyDialog open={openAddDialog} setOpen={setOpenAddDialog} />
      {loading && <LinearProgress />}
    </Paper>
  );
};

export default FacultyExplorerPage;
