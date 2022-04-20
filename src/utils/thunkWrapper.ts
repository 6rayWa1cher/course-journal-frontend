// import { AsyncThunkPayloadCreator, createAsyncThunk } from "@reduxjs/toolkit";
// import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
// import { AxiosError, AxiosResponse } from "axios";
// import { RootState } from "redux/types";

// export const thunkWrapper =
//   <ReturnType, ThunkArg, ErrorType, ConfigType>(
//     func: AsyncThunkPayloadCreator<ReturnType, ThunkArg, ConfigType>
//   ) =>
//   (
//     arg: ThunkArg,
//     thunkApi: BaseThunkAPI<ConfigType["state"], ConfigType["extra"]>
//   ) =>
//     func(arg, thunkApi).catch((e) => {
//       console.error("Thunk error", e);
//       return thunkApi.rejectWithValue(
//         e?.response
//           ? (({ data, status, headers }) => ({ data, status, headers }))(
//               e.response
//             )
//           : e?.message
//           ? e.message
//           : e
//       );
//     });

// export type ErrorType =
//   | string
//   | Pick<AxiosResponse, "data" | "status" | "headers">;

// export const createAsyncThunkWrapped = <
//   ReturnType,
//   ThunkArg,
//   ErrorType,
//   ConfigType = { state: RootState; rejectValue: ErrorType }
// >(
//   actionName: string,
//   payloadCreator: AsyncThunkPayloadCreator<ReturnType, ThunkArg, ConfigType>
// ) =>
//   createAsyncThunk<ReturnType, ThunkArg, ConfigType>(
//     actionName,
//     async (arg, thunkApi) => {
//       try {
//         return await payloadCreator(arg, thunkApi);
//       } catch (e) {
//         console.error("Thunk error", e);
//         const value: ErrorType = e?.response
//           ? (({ data, status, headers }) => ({ data, status, headers }))(
//               e.response
//             )
//           : e?.message
//           ? e.message
//           : e;
//         return thunkApi.rejectWithValue();
//       }
//     }
//   );
export {};
