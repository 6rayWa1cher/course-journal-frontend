import { CourseId } from "@redux/courses";

export interface CourseDto {
  id: CourseId;
  name: string;
  owner: number;
  createdAt: string;
  lastModifiedAt: string;
}
