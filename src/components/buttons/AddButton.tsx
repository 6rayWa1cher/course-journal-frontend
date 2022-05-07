import { IconButton, IconButtonProps } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export interface AddButtonProps extends IconButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const AddButton = ({ onClick, ...props }: AddButtonProps) => (
  <IconButton onClick={onClick} {...props}>
    <AddIcon />
  </IconButton>
);

export default AddButton;
