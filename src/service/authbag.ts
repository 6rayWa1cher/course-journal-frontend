import type { ApiAuthBag } from 'api/types';
import type { AuthBag } from 'models/auth';
import { save, load, remove } from 'utils/localStorage';

const accessTokenValueKey = 'auth.accessToken.value';
const accessTokenExpiringAtKey = 'auth.accessToken.expiringAt';
const refreshTokenValueKey = 'auth.refreshToken.value';
const refreshTokenExpiringAtKey = 'auth.refreshToken.expiringAt';
const authUserIdKey = 'auth.authUserId';

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
      value: accessToken,
      expiringAt: accessTokenExpiringAt,
    },
    refreshToken: {
      value: refreshToken,
      expiringAt: refreshTokenExpiringAt,
    },
    authUserId: userId,
  };
};

export const saveAuthBag = (bag: AuthBag) => {
  const { accessToken, refreshToken, authUserId } = bag;
  save(accessTokenValueKey, accessToken.value);
  save(accessTokenExpiringAtKey, accessToken.expiringAt);
  save(refreshTokenValueKey, refreshToken.value);
  save(refreshTokenExpiringAtKey, refreshToken.expiringAt);
  save(authUserIdKey, authUserId.toString());
};

export const removeAuthBag = () => {
  remove(accessTokenValueKey);
  remove(accessTokenExpiringAtKey);
  remove(refreshTokenValueKey);
  remove(refreshTokenExpiringAtKey);
  remove(authUserIdKey);
};

export const loadAuthBag = (): AuthBag | null => {
  const accessTokenValue = load(accessTokenValueKey);
  const accessTokenExpiringAt = load(accessTokenExpiringAtKey);
  const refreshTokenValue = load(refreshTokenValueKey);
  const refreshTokenExpiringAt = load(refreshTokenExpiringAtKey);
  const authUserId = load(authUserIdKey);
  if (
    accessTokenValue == null ||
    accessTokenExpiringAt == null ||
    refreshTokenValue == null ||
    refreshTokenExpiringAt == null ||
    authUserId == null
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
    authUserId: +authUserId,
  };
};
