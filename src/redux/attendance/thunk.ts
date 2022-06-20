import { createAxiosAsyncThunk } from '@redux/utils';
import {
  getAttendanceByIdApi,
  getAttendanceTableByCourseAndDatePeriodApi,
  getAttendanceTableConflictsByCourseAndDatePeriodApi,
  postAttendanceTableApi,
} from 'api/attendance';
import {
  AttendanceId,
  GetAttendanceTableProps,
  PostAttendanceTableProps,
} from 'models/attendance';

export const getAttendanceByIdThunk = createAxiosAsyncThunk(
  'attendances/getById',
  async ({ attendanceId }: { attendanceId: AttendanceId }) => {
    const data = (await getAttendanceByIdApi(attendanceId)).data;
    return data;
  }
);

export const getAttendanceTableByCourseAndDatePeriod = createAxiosAsyncThunk(
  'attendances/table',
  async ({ courseId, fromDate, toDate }: GetAttendanceTableProps) => {
    const data = (
      await getAttendanceTableByCourseAndDatePeriodApi({
        courseId,
        fromDate,
        toDate,
      })
    ).data;
    return data;
  }
);

export const getAttendanceTableConflictsByCourseAndDatePerion =
  createAxiosAsyncThunk(
    'attendances/conflicts',
    async ({ courseId, fromDate, toDate }: GetAttendanceTableProps) => {
      const data = (
        await getAttendanceTableConflictsByCourseAndDatePeriodApi({
          courseId,
          fromDate,
          toDate,
        })
      ).data;
      return data;
    }
  );

export const postAttendanceTable = createAxiosAsyncThunk(
  'attendances/table/post',
  async ({ table, courseId, fromDate, toDate }: PostAttendanceTableProps) => {
    await postAttendanceTableApi({ table, courseId, fromDate, toDate });
  }
);
