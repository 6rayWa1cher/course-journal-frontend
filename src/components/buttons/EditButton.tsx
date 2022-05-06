import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';

export interface EditIconProps {
  onClick: () => void;
}

const EditButton = ({ onClick }: EditIconProps) => (
  <IconButton onClick={onClick}>
    <EditIcon />
  </IconButton>
);

export default EditButton;
