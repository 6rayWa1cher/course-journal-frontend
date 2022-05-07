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
import { groupSchema, GroupSchemaType } from 'validation/yup/group';
import { createGroupThunk, putGroupThunk } from '@redux/groups';
import { FacultyId } from 'models/faculty';
import { GroupDto } from 'models/group';

export interface EditGroupDialogProps {
  group: GroupDto;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const EditGroupDialog = ({ group, open, setOpen }: EditGroupDialogProps) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    setError,
  } = useForm<GroupSchemaType>({
    resolver: yupResolver(groupSchema),
    mode: 'all',
    defaultValues: {
      name: group.name,
    },
  });

  const handleClose = useCallback(() => setOpen(false), [setOpen]);

  const dispatch = useAppDispatch();
  const { enqueueSuccess, enqueueError } = useMySnackbar();
  const onSubmit = useCallback(
    (data: GroupSchemaType) =>
      dispatch(
        putGroupThunk({ groupId: group.id, data: { ...group, ...data } })
      )
        .then(unwrapResult)
        .then(() => enqueueSuccess(`Группа ${data.name} создана`))
        .then(handleClose)
        .catch((e) => {
          if (e.response?.status === 409) {
            const message =
              'Группа с таким названием в этом факультете уже существует';
            setError('name', {
              type: 'custom',
              message,
            });
            enqueueError(message);
          } else {
            defaultErrorEnqueue(e, enqueueError);
          }
        }),
    [dispatch, enqueueError, group, setError, enqueueSuccess, handleClose]
  );

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Редактирование группы &quot;{group.name}&quot;</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogContentText>
            Чтобы изменить группу, введите ее название ниже
          </DialogContentText>
          <FormTextField
            name="name"
            control={control}
            margin="dense"
            label="Новое название"
            type="text"
            fullWidth
            variant="standard"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отменить</Button>
          <LoadingButton type="submit" loading={isSubmitting} color="primary">
            Сохранить
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};
export default EditGroupDialog;
