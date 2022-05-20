import { setCourseToken } from '@redux/auth/slice';
import { useAppDispatch } from '@redux/utils';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CourseTokenLoader = () => {
  const { token } = useParams();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (token != null) {
      dispatch(setCourseToken(token));
    }
    navigate('/');
  }, [dispatch, navigate, token]);

  return <></>;
};

export default CourseTokenLoader;
