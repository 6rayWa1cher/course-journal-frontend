import { createAxiosAsyncThunk } from '@redux/utils';
import {
  getAttendanceByIdApi,
  getAttendanceTableByCourseAndDatePeriodApi,
  getAttendanceTableByCourseAndGroupAndDatePeriodApi,
  getAttendanceTableConflictsByCourseAndDatePeriodApi,
  getAttendanceTableConflictsByCourseAndGroupAndDatePeriodApi,
  postAttendanceTableApi,
} from 'api/attendance';
import {
  AttendanceId,
  GetAttendanceTableAsHeadmanProps,
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

export const getAttendanceTableByCourseAndDatePeriodAsHeadman =
  createAxiosAsyncThunk(
    'attendances/table',
    async ({
      courseId,
      groupId,
      fromDate,
      toDate,
    }: GetAttendanceTableAsHeadmanProps) => {
      const data = (
        await getAttendanceTableByCourseAndGroupAndDatePeriodApi({
          courseId,
          groupId,
          fromDate,
          toDate,
        })
      ).data;
      return data;
    }
  );

export const getAttendanceTableConflictsByCourseAndDatePerionAsHeadman =
  createAxiosAsyncThunk(
    'attendances/conflicts',
    async ({
      courseId,
      groupId,
      fromDate,
      toDate,
    }: GetAttendanceTableAsHeadmanProps) => {
      const data = (
        await getAttendanceTableConflictsByCourseAndGroupAndDatePeriodApi({
          courseId,
          groupId,
          fromDate,
          toDate,
        })
      ).data;
      return data;
    }
  );
