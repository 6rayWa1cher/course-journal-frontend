import { resolvedCourseIdSelector } from '@redux/courses';
import { Navigate, useParams } from 'react-router-dom';
import { useTypedSelector } from 'utils/hooks';

const CourseTokenRedirect = () => {
  const { token } = useParams();
  const resolvedId = useTypedSelector(resolvedCourseIdSelector);

  const to =
    resolvedId != null && token != null
      ? `/ct/${token}/courses/${resolvedId}`
      : token != null
      ? `/ct/${token}`
      : '/';

  return <Navigate to={to} />;
};

export default CourseTokenRedirect;
