import { createAxiosAsyncThunk } from '@redux/utils';
import {
  getAttendanceByIdApi,
  getAttendanceTableByCourseAndDatePeriodApi,
} from 'api/attendance';
import { AttendanceId, GetAttendanceTableProps } from 'models/attendance';

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
