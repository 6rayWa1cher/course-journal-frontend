import { Typography } from "@mui/material";
import { useDocumentTitle } from "utils/hooks";
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
