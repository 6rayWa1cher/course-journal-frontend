import type { CourseTokenId, CourseTokenDto } from 'models/courseToken';

export interface CourseTokensState {
  entities: Record<CourseTokenId, CourseTokenDto>;
  ids: CourseTokenId[];
}
