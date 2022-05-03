import type { UserRole } from "models/authUser";
import type { CourseDto } from "models/course";
import type { EmployeeId } from "models/employee";

// GENERIC TYPES
export interface PageRequest<Keys extends string = string> {
  page: number;
  size?: number;
  sort?: Record<Keys, "asc" | "desc">;
}

export interface Page<T> {
  totalPages: number; // total number of pages
  totalElements: number; // total element count in database
  size: number; // size of the page
  content: T[]; // actual content
  number: number; // index of the page
  sort: {
    empty: boolean; // is sort criteria provided?
    unsorted: boolean; // data not sorted?
    sorted: boolean; // has the data been sorted?
  };
  pageable: {
    offset: number; // calculated offset
    sort: {
      empty: boolean; // is sort criteria provided?
      unsorted: boolean; // data not sorted?
      sorted: boolean; // has the data been sorted?
    };
    pageNumber: number; // index of the page
    pageSize: number; // size of the page
    paged: boolean; // has the data been paged?
    unpaged: boolean; // data not paged?
  };
  numberOfElements: number; // size of the content array
  first: boolean; // is this page first?
  last: boolean; // is this page last?
  empty: boolean; // is this page empty?
}

// CUSTOM RETURN TYPES

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

// REQUEST TYPES

export interface LoginRequest {
  username: string;
  password: string;
}
export interface RefreshUserIdRequest {
  refreshToken: string;
  userId: number;
}
export interface GetCoursesByOwnerIdRequest {
  name?: string;
  employeeId: EmployeeId;
  pagination: PageRequest<keyof CourseDto>;
}

export interface CreateCourseRequest {
  name: string;
  owner: number;
}

export type EditCourseRequest = CreateCourseRequest;
