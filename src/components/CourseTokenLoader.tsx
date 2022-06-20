import { initAppThunk } from '@redux/app';
import { courseTokenSelector } from '@redux/auth';
import { setCourseToken } from '@redux/auth/slice';
import { useAppDispatch } from '@redux/utils';
import { unwrapResult } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTypedSelector } from 'utils/hooks';

export interface CourseTokenLoaderProps {
  children: Children;
}

const CourseTokenLoader = ({ children }: CourseTokenLoaderProps) => {
  const { token } = useParams();

  const courseToken = useTypedSelector(courseTokenSelector);

  const courseTokenNotLoaded = token != null && courseToken !== token;
  const courseTokenLoaded = token != null && courseToken === token;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (courseTokenNotLoaded) {
      dispatch(setCourseToken(token));
      dispatch(initAppThunk())
        .then(unwrapResult)
        .catch(() => navigate('/'));
    }
  }, [dispatch, navigate, token, courseToken, courseTokenNotLoaded]);

  return <>{courseTokenLoaded && children}</>;
};

export default CourseTokenLoader;
