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
import { defaultErrorEnqueue } from 'utils/errorProcessor';
import { useMySnackbar } from 'utils/hooks';
import { putFacultyThunk } from '@redux/faculties';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { facultySchema, FacultySchemaType } from 'validation/yup/faculty';
import FormTextField from 'components/FormTextField';
import { LoadingButton } from '@mui/lab';
import { FacultyDto } from 'models/faculty';

export interface EditFacultyDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  faculty: FacultyDto;
}

const EditFacultyDialog = ({
  open,
  setOpen,
  faculty,
}: EditFacultyDialogProps) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<FacultySchemaType>({
    resolver: yupResolver(facultySchema),
    mode: 'all',
    defaultValues: {
      name: faculty.name,
    },
  });

  const handleClose = useCallback(() => setOpen(false), [setOpen]);

  const dispatch = useAppDispatch();
  const { enqueueError } = useMySnackbar();
  const onSubmit = useCallback(
    (data: FacultySchemaType) =>
      dispatch(putFacultyThunk({ facultyId: faculty.id, data }))
        .then(unwrapResult)
        .then(handleClose)
        .catch((e) => defaultErrorEnqueue(e, enqueueError)),
    [dispatch, enqueueError, handleClose, faculty]
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
export default EditFacultyDialog;
