import { CourseId } from "@redux/courses";
import { UserId } from "@redux/users";
import { AxiosPromise } from "axios";
import { CourseDto } from "models/course";
import { Page } from "models/generic";
import { mainAxios } from "./myaxios";
import { CreateCourseRequest, EditCourseRequest } from "./types";

export const getCoursesByOwnerApi = (
  userId: UserId,
  name?: string
): AxiosPromise<Page<CourseDto>> =>
  mainAxios.get(`/courses/owner/${userId}`, {
    params: { name },
  });

export const getCourseByIdApi = (id: CourseId): AxiosPromise<CourseDto> =>
  mainAxios.get(`/courses/${id}`);

export const postCourseApi = (
  body: CreateCourseRequest
): AxiosPromise<CourseDto> => mainAxios.post(`/courses/`, body);

export const putCourseApi = (
  id: CourseId,
  body: EditCourseRequest
): AxiosPromise<CourseDto> => mainAxios.put(`/courses/${id}`, body);

export const deleteCourseApi = (id: CourseId): AxiosPromise<CourseDto> =>
  mainAxios.delete(`/courses/${id}`);
