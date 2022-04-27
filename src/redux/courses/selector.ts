import type { RootState } from "@redux/types";
import { CourseId } from "./types";
import { coursesPrefix } from "./types";

const coursesSelector = (state: RootState) => state[coursesPrefix];

const courseIdFromParamsSelector = (
  _: any,
  { courseId }: { courseId: CourseId }
) => courseId;
const courseIdsFromParamsSelector = (_: any, { ids }: { ids: CourseId[] }) =>
  ids;
