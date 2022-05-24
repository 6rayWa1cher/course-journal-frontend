import { selfAuthUserSelector } from '@redux/authUsers';
import { UserRole } from 'models/authUser';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export interface RoleRouteProps {
  role: UserRole;
  fallback: string;
  children: Children;
}

const RoleRoute = ({ role, fallback, children }: RoleRouteProps) => {
  const currentUserRole = useSelector(selfAuthUserSelector)?.userRole;
  if (currentUserRole !== role) {
    console.info('fallback');
    return <Navigate to={fallback} />;
  }
  return <>{children}</>;
};

export default RoleRoute;
