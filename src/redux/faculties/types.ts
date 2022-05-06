import type { FacultyDto, FacultyId } from 'models/faculty';

export interface FacultiesState {
  entities: Record<FacultyId, FacultyDto>;
  ids: FacultyId[];
}
