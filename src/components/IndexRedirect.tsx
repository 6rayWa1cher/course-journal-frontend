import { selfAuthUserSelector } from '@redux/authUsers';
import { UserRole } from 'models/authUser';
import AdminMainPage from 'pages/admin/AdminMainPage';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const IndexRedirect = () => {
  const userRole = useSelector(selfAuthUserSelector)?.userRole;

  return (
    <>
      {userRole === UserRole.ADMIN && <AdminMainPage />}
      {userRole === UserRole.TEACHER && <Navigate to="/courses" replace />}
    </>
  );
};

export default IndexRedirect;
