import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { IconButtonProps, IconButton } from '@mui/material';

const DeleteButton = ({ ...props }: IconButtonProps) => (
  <IconButton {...props}>
    <DeleteOutlineOutlinedIcon />
  </IconButton>
);

export default DeleteButton;
