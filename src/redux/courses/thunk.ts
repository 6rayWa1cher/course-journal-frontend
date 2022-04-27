import { authGetSelfUserApi } from "api/auth";
import { getUserByIdApi } from "api/users";
import { createAxiosAsyncThunk } from "@redux/utils";
import { coursesPrefix } from "./types";

export const coursesGetSelfPageThunk = createAxiosAsyncThunk(
  `${coursesPrefix}/getSelfPage`,
  async (args: CoursesGetSelfPageThunkArgs) => {
    const selfInfo = (await authGetSelfUserApi()).data;
    const user = (await getUserByIdApi(selfInfo.id)).data;
    return user;
  }
);
