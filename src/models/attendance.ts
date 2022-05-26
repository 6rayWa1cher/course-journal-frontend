import { StudentId } from './student';
import { CourseId } from './course';

export enum AttendanceType {
  SERIOUS_REASON = 'SERIOUS_REASON',
  ATTENDED = 'ATTENDED',
}

export enum AttendanceTableType {
  SERIOUS_REASON = 'У',
  ATTENDED = 'П',
  ABSEND = 'О',
}

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
  attendances: AttendanceType[];
  studentGroup: number;
  studentName: string;
};

export type AttendanceTableDto = {
  body: AttendanceTableBodyElement[];
  header: AttendanceTableHeaderElement[];
};

export interface GetAttendanceTableProps {
  courseId: CourseId;
  fromDate: string;
  toDate: string;
}
