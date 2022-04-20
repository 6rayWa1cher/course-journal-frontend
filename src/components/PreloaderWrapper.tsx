import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { CircularProgress } from "@mui/material";
import { initAppThunk, stateSelector } from "@redux/app";
import { useAppDispatch } from "@redux/utils";
import MyBackdrop from "./MyBackdrop";

export interface PreloaderWrapperProps {
  children: Children;
}

const PreloaderWrapper = ({ children }: PreloaderWrapperProps) => {
  const dispatch = useAppDispatch();
  const loadingState = useSelector(stateSelector);
  const error = useSelector(stateSelector);

  useEffect(() => {
    if (loadingState === "idle") {
      dispatch(initAppThunk());
    }
  }, [loadingState, dispatch]);

  const initialLoading = loadingState === "idle" || loadingState === "loading";
  const loadingCausedError = error == null;

  return (
    <>
      {initialLoading && (
        <MyBackdrop>
          <CircularProgress color="inherit" />
        </MyBackdrop>
      )}
      {!initialLoading && loadingCausedError && (
        <MyBackdrop>
          <h1>Что-то пошло не так!</h1>
        </MyBackdrop>
      )}
      {!initialLoading && !loadingCausedError && children}
    </>
  );
};

export default PreloaderWrapper;
