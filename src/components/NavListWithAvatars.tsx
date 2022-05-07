import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EmptyListCaption from './EmptyListCaption';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export interface NavListWithAvatarsProps {
  items: {
    id: number;
    name: string;
    link: string;
    avatar: Children;
  }[];
}

const NavListWithAvatars = ({ items }: NavListWithAvatarsProps) => {
  const navigate = useNavigate();

  return items.length > 0 ? (
    <List>
      {items.map(({ id, name, link, avatar }) => {
        const handleClick = () => navigate(link);
        return (
          <ListItem
            key={id}
            secondaryAction={
              <IconButton onClick={handleClick}>
                <NavigateNextIcon />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton onClick={handleClick}>
              <ListItemAvatar>
                <Avatar>{avatar}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  ) : (
    <EmptyListCaption />
  );
};

export default NavListWithAvatars;
