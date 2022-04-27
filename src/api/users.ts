import { AxiosPromise } from "axios";
import type { UserId } from "@redux/users/types";
import type { UserDto } from "models/user";
import { mainAxios } from "./myaxios";

export const getUserByIdApi = (userId: UserId): AxiosPromise<UserDto> =>
  mainAxios.get(`/users/${userId}`);
