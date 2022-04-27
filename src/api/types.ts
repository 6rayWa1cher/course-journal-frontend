export interface ApiAuthBag {
  refreshToken: string;
  refreshTokenExpiringAt: string;
  accessToken: string;
  accessTokenExpiringAt: string;
  userId: number;
}

export interface RefreshUserIdRequest {
  refreshToken: string;
  userId: number;
}

export interface SelfInfo {
  id: number;
  username: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface CreateCourseRequest {
  name: string;
  owner: number;
}

export type EditCourseRequest = CreateCourseRequest;
