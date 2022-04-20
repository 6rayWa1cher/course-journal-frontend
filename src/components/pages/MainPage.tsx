import { Divider, Grid, Paper, Typography } from "@mui/material";
import { useDocumentTitle } from "utils/hooks";
import React from "react";
import { useSelector } from "react-redux";
import { loggedInUserSelector } from "@redux/users/selector";

const MainPage = () => {
  useDocumentTitle("Главная");
  const { id: userId } = useSelector(loggedInUserSelector);
  return (
    <>
      <Typography>URL сервера приложений: {userId}</Typography>
    </>
  );
};

export default MainPage;
