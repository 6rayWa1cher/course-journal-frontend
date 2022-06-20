import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { isSerializedAxiosError, useAppDispatch } from '@redux/utils';
import { unwrapResult } from '@reduxjs/toolkit';
import { useCallback } from 'react';
import { defaultErrorEnqueue } from 'utils/errorProcessor';
import { useMySnackbar } from 'utils/hooks';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormTextField from 'components/FormTextField';
import { LoadingButton } from '@mui/lab';
import { groupSchema, GroupSchemaType } from 'validation/yup/group';
import { createGroupThunk } from '@redux/groups';
import { FacultyId } from 'models/faculty';
import { GroupDto } from 'models/group';

export interface CreateGroupDialogProps {
  facultyId: FacultyId;
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess?: (data: GroupDto) => void;
}

const CreateGroupDialog = ({
  facultyId,
  open,
  setOpen,
  onSuccess,
}: CreateGroupDialogProps) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    setError,
  } = useForm<GroupSchemaType>({
    resolver: yupResolver(groupSchema),
    mode: 'all',
    defaultValues: {
      name: '',
    },
  });

  const handleClose = useCallback(() => setOpen(false), [setOpen]);

  const dispatch = useAppDispatch();
  const { enqueueSuccess, enqueueError } = useMySnackbar();
  const onSubmit = useCallback(
    async (data: GroupSchemaType) => {
      try {
        const group = await dispatch(
          createGroupThunk({
            ...data,
            faculty: facultyId,
          })
        ).then(unwrapResult);
        enqueueSuccess(`Группа ${data.name} создана`);
        onSuccess?.(group);
        handleClose();
      } catch (e) {
        if (isSerializedAxiosError(e)) {
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
        } else {
          defaultErrorEnqueue(e as Error, enqueueError);
        }
      }
    },
    [
      dispatch,
      facultyId,
      enqueueSuccess,
      onSuccess,
      handleClose,
      setError,
      enqueueError,
    ]
  );

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Создание группы</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogContentText>
            Чтобы создать группу, введите ее название ниже
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
export default CreateGroupDialog;
