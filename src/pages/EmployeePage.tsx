import { yupResolver } from "@hookform/resolvers/yup";
import { Container, Paper } from "@mui/material";
import { employeeByIdSelector, getEmployeeByIdThunk } from "@redux/employees";
import { RootState } from "@redux/types";
import { useAppDispatch } from "@redux/utils";
import { unwrapResult } from "@reduxjs/toolkit";
import BigProcess from "components/BigProcess";
import EmployeeForm from "components/forms/EmployeeForm";
import NotFound from "components/NotFound";
import { EmployeeDto, EmployeeId } from "models/employee";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { defaultErrorEnqueue } from "utils/errorProcessor";
import { useLoadingPlain, useMySnackbar, useParamSelector } from "utils/hooks";
import { employeeSchema, EmployeeSchemaType } from "validation/yup/employee";

const EmployeePage = () => {
  const params = useParams();

  const employeeId = Number(params.employeeId);

  const { enqueueError } = useMySnackbar();

  const dispatch = useAppDispatch();
  const action = useCallback(
    () =>
      Promise.all(
        dispatch(getEmployeeByIdThunk({ employeeId })).then(unwrapResult),
        dispatch()
      ).catch((e) => {
        defaultErrorEnqueue(e, enqueueError);
      }),
    [dispatch, employeeId, enqueueError]
  );
  const { loading, value } = useLoadingPlain(action);

  if (loading) {
    return <BigProcess />;
  }

  if (value == null) {
    return <NotFound />;
  }

  return (
    <Paper>
      <Container>
        <EmployeeForm employeeId={value.id} />
      </Container>
    </Paper>
  );
};

export default EmployeePage;
