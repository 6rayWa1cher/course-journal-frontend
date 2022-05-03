import type { UserRole } from "models/authUser";

export interface PageRequest<Keys extends string = string> {
  page: number;
  size?: number;
  sort?: Record<Keys, "asc" | "desc">;
}

export interface ApiAuthBag {
  refreshToken: string;
  refreshTokenExpiringAt: string;
  accessToken: string;
  accessTokenExpiringAt: string;
  userId: number;
}

export interface SelfInfo {
  id: number;
  username: string;
  userRole: UserRole;
}
