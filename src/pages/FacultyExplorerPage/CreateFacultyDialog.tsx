import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useAppDispatch } from '@redux/utils';
import { unwrapResult } from '@reduxjs/toolkit';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { defaultErrorEnqueue } from 'utils/errorProcessor';
import { useMySnackbar } from 'utils/hooks';
import { createFacultyThunk } from '@redux/faculties';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { facultySchema, FacultySchemaType } from 'validation/yup/faculty';
import FormTextField from 'components/FormTextField';
import { LoadingButton } from '@mui/lab';

export interface CreateFacultyDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CreateFacultyDialog = ({ open, setOpen }: CreateFacultyDialogProps) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<FacultySchemaType>({
    resolver: yupResolver(facultySchema),
    mode: 'all',
    defaultValues: {
      name: '',
    },
  });

  const handleClose = useCallback(() => setOpen(false), [setOpen]);

  const dispatch = useAppDispatch();
  const { enqueueError } = useMySnackbar();
  const navigate = useNavigate();
  const onSubmit = useCallback(
    (data: FacultySchemaType) =>
      dispatch(createFacultyThunk(data))
        .then(unwrapResult)
        .then((dto) => navigate(`/faculties/${dto.id}`))
        .catch((e) => defaultErrorEnqueue(e, enqueueError)),
    [dispatch, enqueueError, navigate]
  );

  return (
    <Dialog open={open} onClose={handleClose} PaperProps={{}}>
      <DialogTitle>Создание факультета</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogContentText>
            Чтобы создать факультет, введите его название ниже.
          </DialogContentText>
          <FormTextField
            name="name"
            control={control}
            margin="dense"
            label="Название"
            type="text"
            fullWidth
            variant="standard"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отменить</Button>
          <LoadingButton type="submit" loading={isSubmitting} color="primary">
            Создать
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};
export default CreateFacultyDialog;
