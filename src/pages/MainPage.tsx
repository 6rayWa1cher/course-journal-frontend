import { Typography } from '@mui/material';
import { useDocumentTitle } from 'utils/hooks';
import { useSelector } from 'react-redux';
import { authUserIdSelector } from '@redux/auth';

const MainPage = () => {
  useDocumentTitle('Главная');
  const authUserId = useSelector(authUserIdSelector);
  return (
    <>
      <Typography>URL сервера приложений: {authUserId}</Typography>
    </>
  );
};

export default MainPage;
