import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useCallback, useState } from 'react';
import { useLoadingPlain } from 'utils/hooks';
import DeleteButton from './DeleteButton';

export interface DeleteButtonProps {
  onDelete: () => Promise<unknown>;
  dialogTitle?: string;
  dialogDescription?: string;
  disabled?: boolean;
}

const DeleteButtonWithConfirm = ({
  onDelete,
  dialogTitle,
  dialogDescription,
  disabled = false,
}: DeleteButtonProps) => {
  const [open, setOpen] = useState(false);
  const handleCloseDialog = useCallback(() => setOpen(false), [setOpen]);
  const handleOpenDialog = useCallback(() => setOpen(true), [setOpen]);
  const deleteAction = useCallback(
    () => onDelete().then(handleCloseDialog),
    [onDelete, handleCloseDialog]
  );
  const deleteProps = useLoadingPlain(deleteAction, { immediate: false });
  const handleDeleteButtonClick = deleteProps.execute;
  return (
    <>
      <DeleteButton onClick={handleOpenDialog} disabled={disabled} />
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>{dialogTitle ?? 'Удалить?'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialogDescription ?? 'Эта операция необратима.'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Отменить</Button>
          <LoadingButton
            onClick={handleDeleteButtonClick}
            loading={deleteProps.loading}
            color="error"
          >
            Удалить
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteButtonWithConfirm;
