import {
  AsyncThunkPayloadCreator,
  createAsyncThunk,
  SerializedError,
  AsyncThunkOptions,
} from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import type { AppDispatch, RootState, SerializedAxiosError } from "./types";

export const useAppDispatch = () => useDispatch<AppDispatch>();

interface ThunkAPIConfig {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: SerializedError;
}

export const createTypedAsyncThunk = <ReturnType, ThunkArg = void>(
  actionName: string,
  thunkFunction: AsyncThunkPayloadCreator<ReturnType, ThunkArg, ThunkAPIConfig>,
  options?: AsyncThunkOptions<ThunkArg, ThunkAPIConfig>
) =>
  createAsyncThunk<ReturnType, ThunkArg, ThunkAPIConfig>(
    actionName,
    thunkFunction,
    options
  );

export const serializeAxiosError = (e: AxiosError): SerializedAxiosError => {
  const { code, message, stack, response } = e;
  const serializedResponse =
    response == null
      ? response
      : {
          data: response.data,
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
        };
  return {
    code,
    message,
    stack,
    response: serializedResponse,
  };
};

interface AxiosThunkApiConfig extends ThunkAPIConfig {
  rejectValue: SerializedAxiosError | Error;
}

export const createAxiosAsyncThunk = <Returned, ThunkArg = void>(
  type: string,
  thunk: AsyncThunkPayloadCreator<Returned, ThunkArg, AxiosThunkApiConfig>,
  options?: AsyncThunkOptions<ThunkArg, AxiosThunkApiConfig>
) =>
  createAsyncThunk<Returned, ThunkArg, AxiosThunkApiConfig>(
    type,
    async (arg, thunkAPI) => {
      try {
        return await thunk(arg, thunkAPI);
      } catch (err: any) {
        if ("isAxiosError" in err) {
          return thunkAPI.rejectWithValue(
            serializeAxiosError(err as AxiosError)
          );
        } else {
          throw err;
        }
      }
    },
    options
  );
