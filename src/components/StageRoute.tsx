import React from "react";
import { useSelector } from "react-redux";

import { stageSelector } from "@redux/app";
import StageRedirect from "components/StageRedirect";
import { Stage } from "@redux/app";

export interface StageRouteProps {
  stage: Stage | Stage[];
  children: Children;
}

const StageRoute = ({ stage: expectedStage, children }: StageRouteProps) => {
  const stage = useSelector(stageSelector);
  console.debug("stage: " + stage);
  const decision = (() => {
    if (expectedStage instanceof Array) {
      return expectedStage.includes(stage);
    } else {
      return stage === expectedStage;
    }
  })();

  return decision ? <>{children}</> : <StageRedirect />;
};

export default StageRoute;
