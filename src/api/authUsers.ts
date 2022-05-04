import type { AxiosPromise } from 'axios';
import type { AuthUserDto, AuthUserId } from 'models/authUser';
import { mainAxios } from './helpers/myaxios';

export const getAuthUserByIdApi = (
  authUserId: AuthUserId
): AxiosPromise<AuthUserDto> => mainAxios.get(`/auth-user/${authUserId}`);
