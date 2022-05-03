import { createAxiosAsyncThunk } from "@redux/utils";
import { getCoursesByOwnerApi, GetCoursesByOwnerIdRequest } from "api/courses";

export const coursesGetSelfPageThunk = createAxiosAsyncThunk(
  "courses/getSelfPage",
  async (args: GetCoursesByOwnerIdRequest) => {
    const data = (await getCoursesByOwnerApi(args)).data;
    return data;
  }
);
