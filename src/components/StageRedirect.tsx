import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Stage, stageSelector } from '@redux/app';

export const getStageRedirectTo = (stage: Stage) => {
  switch (stage) {
    case Stage.UNAUTHORIZED:
      return '/login';
    default:
      return '/';
  }
};

const StageRedirect = ({ ...rest }) => {
  const stage = useSelector(stageSelector);

  const to = getStageRedirectTo(stage);

  return <Navigate to={to} {...rest} />;
};

export default StageRedirect;
