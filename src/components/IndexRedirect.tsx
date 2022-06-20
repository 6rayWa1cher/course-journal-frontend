import { courseTokenSelector } from '@redux/auth';
import { selfAuthUserSelector } from '@redux/authUsers';
import { UserRole } from 'models/authUser';
import AdminMainPage from 'pages/admin/AdminMainPage';
import { Navigate } from 'react-router-dom';
import { useTypedSelector } from 'utils/hooks';

const IndexRedirect = () => {
  const userRole = useTypedSelector(selfAuthUserSelector)?.userRole;
  const courseToken = useTypedSelector(courseTokenSelector);

  return (
    <>
      {userRole === UserRole.ADMIN && <AdminMainPage />}
      {userRole === UserRole.TEACHER && <Navigate to="/courses" replace />}
      {userRole === UserRole.HEADMAN && <Navigate to="/headman" replace />}
      {courseToken !== null && <Navigate to={`/ct/${courseToken}/`} replace />}
    </>
  );
};

export default IndexRedirect;
