import { AxiosPromise } from 'axios';
import { CourseId } from 'models/course';
import {
  AttendanceId,
  AttendanceDto,
  AttendanceRestDto,
  AttendanceTableDto,
  GetAttendanceTableProps,
  AttendanceConflictListDto,
  PostAttendanceTableProps,
} from 'models/attendance';
import { mainAxios } from './helpers/myaxios';

export const getAttendanceByIdApi = (
  attendanceId: AttendanceId
): AxiosPromise<AttendanceDto> => mainAxios.get(`/attendances/${attendanceId}`);

export const getAttendancesByCourseIdApi = (
  courseId: CourseId
): AxiosPromise<AttendanceDto[]> =>
  mainAxios.get(`/attendances/course/${courseId}/all`);

export const createAttendanceApi = (
  data: AttendanceRestDto
): AxiosPromise<AttendanceDto> => mainAxios.post('/attendances/', data);

export const putAttendanceApi = (
  attendanceId: AttendanceId,
  data: AttendanceRestDto
): AxiosPromise<AttendanceDto> =>
  mainAxios.put(`/attendances/${attendanceId}`, data);

export const deleteAttendanceApi = (
  attendanceId: AttendanceId
): AxiosPromise<AttendanceDto> =>
  mainAxios.delete(`/attendances/${attendanceId}`);

export const getAttendanceTableByCourseAndDatePeriodApi = ({
  courseId,
  fromDate,
  toDate,
}: GetAttendanceTableProps): AxiosPromise<AttendanceTableDto> =>
  mainAxios.get(
    `/attendances/table/${courseId}?fromDate=${fromDate}&toDate=${toDate}`
  );

export const getAttendanceTableConflictsByCourseAndDatePeriodApi = ({
  courseId,
  fromDate,
  toDate,
}: GetAttendanceTableProps): AxiosPromise<AttendanceConflictListDto> =>
  mainAxios.get(
    `/attendances/conflicts/${courseId}?fromDate=${fromDate}&toDate=${toDate}`
  );

export const postAttendanceTableApi = ({
  table,
  courseId,
  fromDate,
  toDate,
}: PostAttendanceTableProps) =>
  mainAxios.post(
    `/attendances/table/${courseId}?fromDate=${fromDate}&toDate=${toDate}`,
    table
  );
