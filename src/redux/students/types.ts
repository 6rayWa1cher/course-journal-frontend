import type { StudentDto, StudentId } from 'models/student';

export interface StudentsState {
  entities: Record<StudentId, StudentDto>;
  ids: StudentId[];
}
