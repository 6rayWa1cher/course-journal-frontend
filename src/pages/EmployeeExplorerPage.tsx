import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
} from "@mui/material";
import { geеEmployeesThunk } from "@redux/employees";
import { useAppDispatch } from "@redux/utils";
import { unwrapResult } from "@reduxjs/toolkit";
import BigProcess from "components/BigProcess";
import { EmployeeId } from "models/employee";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { defaultErrorEnqueue } from "utils/errorProcessor";
import { useLoadingPlain, useMySnackbar, useParamSelector } from "utils/hooks";
import { getFirstCapitalSymbols } from "utils/string";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const EmployeeExplorerPage = () => {
  const [page, setPage] = useState(0);
  const { enqueueError } = useMySnackbar();
  const dispatch = useAppDispatch();
  const action = useCallback(
    () =>
      dispatch(geеEmployeesThunk({ page }))
        .then(unwrapResult)
        .catch((e) => {
          defaultErrorEnqueue(e, enqueueError);
        }),
    [dispatch, page, enqueueError]
  );
  const { loading, execute, value } = useLoadingPlain(action);

  const navigate = useNavigate();
  const handleItemClick = useCallback(
    (id: number) => navigate(`/employees/${id}`),
    [navigate]
  );

  if (loading) {
    return <BigProcess />;
  }

  return (
    <Paper>
      <List>
        {value?.content.map(({ id, firstName, middleName, lastName }) => {
          const fullName = [lastName, firstName, middleName].join(" ");
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
                  <Avatar>{getFirstCapitalSymbols(fullName)}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={fullName} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
};

export default EmployeeExplorerPage;
