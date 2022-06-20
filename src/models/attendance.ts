import { StudentId } from './student';
import { CourseId } from './course';

export enum AttendanceType {
  SERIOUS_REASON = 'SERIOUS_REASON',
  ATTENDED = 'ATTENDED',
}

export const BackToAttendanceType: Record<string, AttendanceType | null> = {
  SERIOUS_REASON: AttendanceType.SERIOUS_REASON,
  ATTENDED: AttendanceType.ATTENDED,
  ABSEND: null,
};

export const AttendanceTableType: Record<string, string> = {
  SERIOUS_REASON: 'У',
  ATTENDED: 'П',
  null: 'О',
  О: 'ABSEND',
  П: 'ATTENDED',
  У: 'SERIOUS_REASON',
};

export type AttendanceId = number;

export interface AttendanceDto {
  id: AttendanceId;
  student: StudentId;
  course: CourseId;
  attendedClass: number;
  attendedDate: string;
  createdAt: string;
  lastModifiedAt: string;
  attendanceType: AttendanceType;
}

export type AttendanceRestDto = Omit<
  AttendanceDto,
  'id' | 'createdAt' | 'lastModifiedAt'
>;

export type AttendanceTableHeaderElement = {
  date: string;
  classNumber: number;
};

export type AttendanceTableBodyElement = {
  studentId: StudentId;
  attendances: (AttendanceType | null)[];
  studentGroup: number;
  studentName: string;
};

export type AttendanceTableDto = {
  body: AttendanceTableBodyElement[];
  header: AttendanceTableHeaderElement[];
};

export type AttendanceTableConflict = {
  conflictedTeacherFullName: string;
  conflictedCourseName: string;
  studentId: number;
  attendedDate: string;
  attendedClass: number;
  attendanceType: AttendanceType;
};

export type AttendanceConflictListDto = {
  conflicts: AttendanceTableConflict[];
};

export interface GetAttendanceTableProps {
  courseId: CourseId;
  fromDate: string;
  toDate: string;
}

export interface PostAttendanceTableProps {
  table: AttendanceTableDto;
  courseId: CourseId;
  fromDate: string;
  toDate: string;
}
