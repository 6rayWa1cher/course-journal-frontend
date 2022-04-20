import { AuthBag } from "@redux/auth/types";
import { ApiAuthBag } from "api/types";
import { save, load, remove } from "utils/localStorage";

const accessTokenValueKey = "auth.accessToken.value";
const accessTokenExpiringAtKey = "auth.accessToken.expiringAt";
const refreshTokenValueKey = "auth.refreshToken.value";
const refreshTokenExpiringAtKey = "auth.refreshToken.expiringAt";
const userIdKey = "auth.userId";

export const convertAuthBagFromApi = (apiBag: ApiAuthBag): AuthBag => {
  const {
    refreshToken,
    refreshTokenExpiringAt,
    accessToken,
    accessTokenExpiringAt,
    userId,
  } = apiBag;
  return {
    accessToken: {
      value: accessToken as string,
      expiringAt: accessTokenExpiringAt as string,
    },
    refreshToken: {
      value: refreshToken as string,
      expiringAt: refreshTokenExpiringAt as string,
    },
    userId: userId as number,
  };
};

export const saveAuthBag = (bag: AuthBag) => {
  const { accessToken, refreshToken, userId } = bag;
  save(accessTokenValueKey, accessToken.value);
  save(accessTokenExpiringAtKey, accessToken.expiringAt);
  save(refreshTokenValueKey, refreshToken.value);
  save(refreshTokenExpiringAtKey, refreshToken.expiringAt);
  save(userIdKey, userId.toString());
};

export const removeAuthBag = () => {
  remove(accessTokenValueKey);
  remove(accessTokenExpiringAtKey);
  remove(refreshTokenValueKey);
  remove(refreshTokenExpiringAtKey);
  remove(userIdKey);
};

export const loadAuthBag = (): AuthBag | null => {
  const accessTokenValue = load(accessTokenValueKey);
  const accessTokenExpiringAt = load(accessTokenExpiringAtKey);
  const refreshTokenValue = load(refreshTokenValueKey);
  const refreshTokenExpiringAt = load(refreshTokenExpiringAtKey);
  const userId = load(userIdKey);
  if (
    accessTokenValue === null ||
    accessTokenExpiringAt === null ||
    refreshTokenValue === null ||
    refreshTokenExpiringAt == null ||
    userId === null
  ) {
    removeAuthBag();
    return null;
  }
  return {
    accessToken: {
      value: accessTokenValue,
      expiringAt: accessTokenExpiringAt,
    },
    refreshToken: {
      value: refreshTokenValue,
      expiringAt: refreshTokenExpiringAt,
    },
    userId: +userId,
  };
};
