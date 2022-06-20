import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { batchCreateStudentThunk } from '@redux/students';
import { isSerializedAxiosError, useAppDispatch } from '@redux/utils';
import { unwrapResult } from '@reduxjs/toolkit';
import FormTextField from 'components/FormTextField';
import { GroupId } from 'models/group';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { defaultErrorEnqueue } from 'utils/errorProcessor';
import { useMySnackbar } from 'utils/hooks';
import {
  batchFullNamesSchema,
  BatchFullNamesTransformedSchemaType,
} from 'validation/yup/student';

export interface AddStudentsDialogProps {
  groupId: GroupId;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AddStudentsDialog = ({
  groupId,
  open,
  setOpen,
}: AddStudentsDialogProps) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    setError,
  } = useForm<BatchFullNamesTransformedSchemaType>({
    resolver: yupResolver(batchFullNamesSchema),
    mode: 'all',
    defaultValues: {
      batchFullNames: [],
    },
  });

  const handleClose = useCallback(() => setOpen(false), [setOpen]);

  const dispatch = useAppDispatch();
  const { enqueueSuccess, enqueueError } = useMySnackbar();
  const onSubmit = useCallback(
    async (data: BatchFullNamesTransformedSchemaType) => {
      try {
        const preparedStudents = data.batchFullNames.map((array) => ({
          lastName: array[0],
          firstName: array[1],
          middleName: array[2] ?? null,
        }));
        const students = await dispatch(
          batchCreateStudentThunk({
            students: preparedStudents,
            group: groupId,
          })
        ).then(unwrapResult);
        enqueueSuccess(`Создано ${students.length} студентов`);
        handleClose();
      } catch (e) {
        if (isSerializedAxiosError(e)) {
          if (e.response?.status === 409) {
            const message =
              'Существуют студенты в этой группе с такими же именами';
            setError('batchFullNames', {
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
    [dispatch, groupId, enqueueSuccess, handleClose, setError, enqueueError]
  );

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Создание студентов</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogContentText>
            Чтобы создать студентов, введите их ФИО, по одному на строке
          </DialogContentText>
          <FormTextField
            name="batchFullNames"
            control={control}
            margin="dense"
            label="ФИО студентов"
            type="text"
            fullWidth
            variant="standard"
            required
            multiline
            rows={4}
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

export default AddStudentsDialog;
