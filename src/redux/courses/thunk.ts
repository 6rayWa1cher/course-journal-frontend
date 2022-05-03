import { createAxiosAsyncThunk } from "@redux/utils";
import { getCoursesByOwnerApi } from "api/courses";
import { GetCoursesByOwnerIdRequest } from "api/types";

export const getSelfCoursesPageThunk = createAxiosAsyncThunk(
  "courses/getSelfPage",
  async (args: GetCoursesByOwnerIdRequest) => {
    const data = (await getCoursesByOwnerApi(args)).data;
    return data;
  }
);
