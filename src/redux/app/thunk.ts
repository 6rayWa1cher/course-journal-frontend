import { eraseBag, loadBag } from "@redux/auth/slice";
import { usersGetSelfUserThunk } from "@redux/users";
import { createTypedAsyncThunk } from "@redux/utils";
import { appPrefix } from "./types";

export const initAppThunk = createTypedAsyncThunk(
  appPrefix + "/init",
  async (_, { dispatch }) => {
    dispatch(loadBag());
    try {
      await dispatch(usersGetSelfUserThunk());
    } catch (err) {
      console.log("Emitting logout in response to ", err);
      dispatch(eraseBag());
    }
  }
);
