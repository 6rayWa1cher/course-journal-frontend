import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Divider, Grid, LinearProgress } from "@mui/material";
import { padding, styled } from "@mui/system";
import { employeeByIdSelector } from "@redux/employees";
import { useAppDispatch } from "@redux/utils";
import { EmployeeData, EmployeeDto, EmployeeId } from "models/employee";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useMySnackbar, useParamSelector } from "utils/hooks";
import { EmailPasswordSchemaType } from "validation/yup";
import { employeeSchema, EmployeeSchemaType } from "validation/yup/employee";
import FormTextField from "../FormTextField";

interface EmployeeFormProps {
  employeeId: EmployeeId;
}

const PaddingGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(1),
}));

const EmployeeForm = ({ employeeId }: EmployeeFormProps) => {
  const employee = useParamSelector(employeeByIdSelector, { employeeId });
  const dispatch = useAppDispatch();
  const { enqueueError } = useMySnackbar();
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<EmployeeSchemaType & EmailPasswordSchemaType>({
    resolver: yupResolver(employeeSchema),
    mode: "all",
    defaultValues: {
      firstName: employee?.firstName ?? "",
      middleName: employee?.middleName ?? "",
      lastName: employee?.lastName ?? "",
      department: employee?.department ?? "",
      username: "",
      password: "",
    },
  });

  const onSubmit = useCallback((data: EmployeeData) => {
    return Promise.resolve();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <PaddingGrid item xs={12} md={4}>
          <FormTextField
            name="lastName"
            control={control}
            variant="outlined"
            margin="normal"
            label="Фамилия"
            type="text"
            fullWidth
            required
          />
        </PaddingGrid>
        <PaddingGrid item xs={12} md={4}>
          <FormTextField
            name="firstName"
            control={control}
            variant="outlined"
            margin="normal"
            label="Имя"
            type="text"
            fullWidth
            required
          />
        </PaddingGrid>
        <PaddingGrid item xs={12} md={4}>
          <FormTextField
            name="middleName"
            control={control}
            variant="outlined"
            margin="normal"
            label="Отчество"
            type="text"
            fullWidth
          />
        </PaddingGrid>
        <PaddingGrid item xs={12}>
          <FormTextField
            name="department"
            control={control}
            variant="outlined"
            margin="normal"
            label="Отдел"
            type="text"
            fullWidth
          />
        </PaddingGrid>
      </Grid>
      <Divider />
      <Grid container>
        <PaddingGrid item xs={12} md={6}>
          <FormTextField
            name="username"
            control={control}
            variant="outlined"
            margin="normal"
            label="Логин"
            type="text"
            autoComplete="off"
            fullWidth
            required
          />
        </PaddingGrid>
        <PaddingGrid item xs={12} md={6}>
          <FormTextField
            name="password"
            control={control}
            variant="outlined"
            margin="normal"
            label="Пароль"
            type="text"
            autoComplete="off"
            fullWidth
            required
          />
        </PaddingGrid>
      </Grid>
      <Divider />
      <Grid container>
        <Grid item xs={12} md={6}>
          <Button
            type="reset"
            fullWidth
            variant="outlined"
            sx={{
              margin: (theme) => theme.spacing(3, 0, 2),
            }}
          >
            Очистить
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              margin: (theme) => theme.spacing(3, 0, 2),
            }}
          >
            Войти
          </Button>
        </Grid>
      </Grid>
      {isSubmitting && <LinearProgress />}
    </form>
  );
};

export default EmployeeForm;
