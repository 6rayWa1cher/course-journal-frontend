import { usersPrefix } from "./types";
import { authGetSelfUserApi } from "api/auth";
import { getUserByIdApi } from "api/users";
import { createAxiosAsyncThunk } from "@redux/utils";

export const usersGetSelfUserThunk = createAxiosAsyncThunk(
  `${usersPrefix}/getSelfUser`,
  async () => {
    const selfInfo = (await authGetSelfUserApi()).data;
    const user = (await getUserByIdApi(selfInfo.id)).data;
    return user;
  }
);
