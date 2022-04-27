import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CircularProgress } from "@mui/material";
import { initAppThunk, stateSelector, WebApplicationState } from "@redux/app";
import { useAppDispatch } from "@redux/utils";
import MyBackdrop from "./MyBackdrop";
import { AppDispatch, RootState } from "@redux/types";

export interface PreloaderWrapperProps {
  children: Children;
}

const PreloaderWrapper = ({ children }: PreloaderWrapperProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const loadingState = useSelector(stateSelector);
  const error = useSelector(stateSelector);

  useEffect(() => {
    if (loadingState === WebApplicationState.IDLE) {
      dispatch(initAppThunk());
    }
  }, [loadingState, dispatch]);
  const initialLoading =
    loadingState === WebApplicationState.IDLE ||
    loadingState === WebApplicationState.LOADING;
  const loadingCausedError = error == null;
  console.log("wrapper rendered");
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
