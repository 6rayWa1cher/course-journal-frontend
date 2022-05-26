import {
  courseByIdSelector,
  getCourseByIdWithItsStudentsThunk,
} from '@redux/courses';
import { studentsByIdsSelector } from '@redux/students';
import PreLoading from 'components/PreLoading';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLoadingActionThunk, useParamSelector } from 'utils/hooks';
import AttendanceTable from './AttendanceTable';
import { StudentDto } from 'models/student';
import {
  AttendanceTableDto,
  AttendanceTableType,
  GetAttendanceTableProps,
} from 'models/attendance';
import { getAttendanceTableByCourseAndDatePeriodApi } from 'api/attendance';
import * as fns from 'date-fns';
import { unwrapResult } from '@reduxjs/toolkit';

async function getAttendanceTableByCourse({
  courseId,
  fromDate,
  toDate,
}: GetAttendanceTableProps) {
  try {
    const table: AttendanceTableDto = (
      await getAttendanceTableByCourseAndDatePeriodApi({
        courseId,
        fromDate,
        toDate,
      })
    ).data;
    return table;
  } catch (e) {
    return { header: [], body: [] };
  }
}

const AttendanceJournal = () => {
  const params = useParams();
  const courseId = Number(params.courseId);
  const thunk = useCallback(
    () => getCourseByIdWithItsStudentsThunk({ courseId }),
    [courseId]
  );
  const loadingAction = useLoadingActionThunk(thunk);
  const course = useParamSelector(courseByIdSelector, { courseId });
  const students = useParamSelector(studentsByIdsSelector, {
    ids: course?.students ?? [],
  }) as StudentDto[];
  const toDate = Date.now();
  const fromDate = fns.format(fns.subDays(toDate, 10), 'yyyy-MM-dd');
  const [table, setTable] = useState<AttendanceTableDto>({
    body: [],
    header: [],
  });
  useEffect(() => {
    getAttendanceTableByCourse({
      courseId,
      fromDate,
      toDate: fns.format(toDate, 'yyyy-MM-dd'),
    }).then((value) => {
      setTable(value);
    });
  }, [courseId, fromDate, toDate, setTable]);

  return (
    <>
      {
        <PreLoading action={loadingAction}>
          <AttendanceTable table={table} />
        </PreLoading>
      }
    </>
  );
};

export default AttendanceJournal;
