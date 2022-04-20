import React from "react";
import { Stage } from "@redux/app";
import DashboardFrame from "./DashboardFrame";
import StageRoute from "./StageRoute";

const MainElement = () => {
  return (
    <StageRoute stage={Stage.AUTHORIZED}>
      <DashboardFrame />
    </StageRoute>
  );
};

export default MainElement;
