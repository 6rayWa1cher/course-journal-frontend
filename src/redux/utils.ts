import {
  AsyncThunkPayloadCreator,
  createAsyncThunk,
  SerializedError,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "./types";

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const createTypedAsyncThunk = <
  ReturnType,
  ThunkArg = void,
  ConfigType = { state: RootState; rejectValue: SerializedError }
>(
  actionName: string,
  thunkFunction: AsyncThunkPayloadCreator<ReturnType, ThunkArg, ConfigType>
) =>
  createAsyncThunk<ReturnType, ThunkArg, ConfigType>(actionName, thunkFunction);

export const createAxiosAsyncThunk = <
  ReturnType,
  ErrorType extends AxiosError,
  ThunkArg = void,
  ConfigType = { state: RootState; rejectValue: ErrorType }
>(
  actionName: string,
  thunkFunction: AsyncThunkPayloadCreator<ReturnType, ThunkArg, ConfigType>
) =>
  createAsyncThunk<ReturnType, ThunkArg, ConfigType>(actionName, thunkFunction);
