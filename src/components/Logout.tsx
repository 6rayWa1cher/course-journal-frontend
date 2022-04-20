import { logoutThunk } from "@redux/auth";
import React, { useCallback } from "react";
import { Navigate } from "react-router-dom";
import { useLoadingPlain, useTypedDispatch } from "utils/hooks";
import MyBackdrop from "./MyBackdrop";
import { CircularProgress } from "@mui/material";

const Logout = () => {
  const dispatch = useTypedDispatch();
  const loadingFunc = useCallback(() => dispatch(logoutThunk()), [dispatch]);
  const { idle, loading } = useLoadingPlain(loadingFunc, { immediate: true });

  if (idle || loading) {
    return (
      <MyBackdrop>
        <CircularProgress />
      </MyBackdrop>
    );
  } else {
    return <Navigate to="/" replace />;
  }
};

export default Logout;
