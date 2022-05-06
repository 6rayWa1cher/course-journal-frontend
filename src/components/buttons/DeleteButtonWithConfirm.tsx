import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { useCallback, useState } from 'react';
import { useLoadingPlain } from 'utils/hooks';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

export interface DeleteButtonProps {
  onDelete: () => Promise<unknown>;
  dialogTitle?: string;
  dialogDescription?: string;
}

const DeleteButtonWithConfirm = ({
  onDelete,
  dialogTitle,
  dialogDescription,
}: DeleteButtonProps) => {
  const [open, setOpen] = useState(false);
  const handleCloseDialog = useCallback(() => setOpen(false), [setOpen]);
  const handleOpenDialog = useCallback(() => setOpen(true), [setOpen]);
  const deleteProps = useLoadingPlain(onDelete, { immediate: false });
  const handleDeleteButtonClick = deleteProps.execute;
  return (
    <>
      <IconButton onClick={handleOpenDialog}>
        <DeleteOutlineOutlinedIcon />
      </IconButton>
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
