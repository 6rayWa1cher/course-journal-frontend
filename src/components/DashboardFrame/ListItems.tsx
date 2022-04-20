import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HistoryIcon from "@mui/icons-material/History";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

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

export const secondaryListItems = <div></div>;
