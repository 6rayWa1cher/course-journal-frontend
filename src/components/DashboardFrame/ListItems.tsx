import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HistoryIcon from '@mui/icons-material/History';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

export const mainListItems = (
  <div>
    <ListItem button component={Link} to="/">
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Главная" />
    </ListItem>
    <ListItem button component={Link} to="/history">
      <ListItemIcon>
        <HistoryIcon />
      </ListItemIcon>
      <ListItemText primary="История игр" />
    </ListItem>
    <ListItem button component={Link} to="/leaderboard">
      <ListItemIcon>
        <EmojiEventsIcon />
      </ListItemIcon>
      <ListItemText primary="Таблица рекордов" />
    </ListItem>
  </div>
);

export const adminListItems = (
  <>
    <ListItem button component={Link} to="/employees">
      <ListItemIcon>
        <AccountBoxIcon />
      </ListItemIcon>
      <ListItemText primary="Преподаватели" />
    </ListItem>
    <ListItem button component={Link} to="/faculties">
      <ListItemIcon>
        <AccountBalanceIcon />
      </ListItemIcon>
      <ListItemText primary="Факультеты" />
    </ListItem>
  </>
);

export const secondaryListItems = <div></div>;
