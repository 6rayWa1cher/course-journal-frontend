import EditIcon from '@mui/icons-material/Edit';
import { IconButton, IconButtonProps } from '@mui/material';

export interface EditIconProps {
  onClick: () => void;
}

const EditButton = ({ onClick, ...props }: EditIconProps & IconButtonProps) => (
  <IconButton onClick={onClick} {...props}>
    <EditIcon />
  </IconButton>
);

export default EditButton;
