import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLoadingActionThunk, useTypedSelector } from 'utils/hooks';
import AttendanceTable from './AttendanceTable';
import {
  AttendanceConflictListDto,
  AttendanceTableBodyElement,
  AttendanceTableDto,
  AttendanceTableHeaderElement,
  BackToAttendanceType,
  GetAttendanceTableAsHeadmanProps,
  GetAttendanceTableProps,
} from 'models/attendance';
import {
  getAttendanceTableByCourseAndDatePeriodApi,
  getAttendanceTableByCourseAndGroupAndDatePeriodApi,
  getAttendanceTableConflictsByCourseAndDatePeriodApi,
  getAttendanceTableConflictsByCourseAndGroupAndDatePeriodApi,
} from 'api/attendance';
import * as fns from 'date-fns';
import { StudentId } from 'models/student';
import { postAttendanceTable } from '@redux/attendance/thunk';
import { useAppDispatch } from '@redux/utils';
import {
  CreateDateClassNumberAttendance,
  createDateClassNumberAttendance,
} from 'validation/yup/attendance';
import { yupResolver } from '@hookform/resolvers/yup';
import { getClassNumberByTime, getFirstSeptemberDate } from 'utils/date';
import SetStudentsAttendancesModal from 'components/modals/SetStudentsAttendancesModal';
import AddNewAttendanceModal from 'components/modals/AddNewAttendanceModal';
import { useForm } from 'react-hook-form';
import { UserRole } from 'models/authUser';
import { selfAuthUserSelector } from '@redux/authUsers';
import { selfGroupSelector } from '@redux/selector';
import { getCourseByIdThunk } from '@redux/courses';
import PreLoading from 'components/PreLoading';

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

async function getAttendanceTableConflictsByCourse({
  courseId,
  fromDate,
  toDate,
}: GetAttendanceTableProps) {
  try {
    const data: AttendanceConflictListDto = (
      await getAttendanceTableConflictsByCourseAndDatePeriodApi({
        courseId,
        fromDate,
        toDate,
      })
    ).data;
    return data;
  } catch (e) {
    return { conflicts: [] };
  }
}

async function getAttendanceTableAsHeadman({
  courseId,
  groupId,
  fromDate,
  toDate,
}: GetAttendanceTableAsHeadmanProps) {
  try {
    const table: AttendanceTableDto = (
      await getAttendanceTableByCourseAndGroupAndDatePeriodApi({
        courseId,
        groupId,
        fromDate,
        toDate,
      })
    ).data;
    return table;
  } catch (e) {
    return { header: [], body: [] };
  }
}

async function getAttendanceTableConflictsAsHeadman({
  courseId,
  groupId,
  fromDate,
  toDate,
}: GetAttendanceTableAsHeadmanProps) {
  try {
    const data: AttendanceConflictListDto = (
      await getAttendanceTableConflictsByCourseAndGroupAndDatePeriodApi({
        courseId,
        groupId,
        fromDate,
        toDate,
      })
    ).data;
    return data;
  } catch (e) {
    return { conflicts: [] };
  }
}

const AttendanceJournal = () => {
  const params = useParams();
  const role = useTypedSelector(selfAuthUserSelector)?.userRole;

  const methods = useForm<CreateDateClassNumberAttendance>({
    resolver: yupResolver(createDateClassNumberAttendance),
    mode: 'all',
    defaultValues: {
      date: fns.format(Date.now(), 'yyyy-MM-dd'),
      classNumber: getClassNumberByTime(
        fns.getHours(Date.now()),
        fns.getMinutes(Date.now())
      ),
    },
  });

  const courseId = Number(params.courseId);
  const groupId = useRef<number>(useTypedSelector(selfGroupSelector) as number);
  const dispatch = useAppDispatch();

  const thunk = useCallback(() => getCourseByIdThunk({ courseId }), [courseId]);
  const loadingAction = useLoadingActionThunk(thunk);

  const firstSeptemberStartWeek = fns.startOfWeek(
    getFirstSeptemberDate(new Date(Date.now())),
    { weekStartsOn: 1 }
  );

  const [date, setDate] = useState(
    fns.startOfWeek(Date.now(), { weekStartsOn: 1 })
  );

  const [page, setPage] = useState(
    fns.differenceInCalendarWeeks(date, firstSeptemberStartWeek)
  );

  const count = 52;

  const fromDate = fns.format(date, 'yyyy-MM-dd');

  const toDate = fns.format(fns.addDays(date, 6), 'yyyy-MM-dd');

  const [table, setTable] = useState<AttendanceTableDto>({
    body: [],
    header: [],
  });

  const [conflictsDto, setConflictsDto] = useState<AttendanceConflictListDto>({
    conflicts: [],
  });

  const [isAddModalOpened, setIsSetStudentAttendancesModalOpened] =
    useState(false);

  const [isAddNewAttendanceModalOpened, setIsAddNewAttendanceModalOpened] =
    useState(false);

  const [currentStudentIndexInModal, setCurrentStudentIndexInModal] =
    useState(0);
  const [currentAttendanceIndexInModal, setCurrentAttendanceIndexInModal] =
    useState(0);

  useEffect(() => {
    if (role === UserRole.TEACHER) {
      getAttendanceTableByCourse({
        courseId,
        fromDate,
        toDate,
      }).then((value) => {
        setTable(value);
      });
      getAttendanceTableConflictsByCourse({
        courseId,
        fromDate,
        toDate,
      }).then((value) => {
        setConflictsDto(value);
      });
    } else if (role === UserRole.HEADMAN) {
      getAttendanceTableAsHeadman({
        courseId,
        groupId: groupId.current,
        fromDate,
        toDate,
      }).then((value) => {
        setTable(value);
      });
      getAttendanceTableConflictsAsHeadman({
        courseId,
        groupId: groupId.current,
        fromDate,
        toDate,
      }).then((value) => {
        setConflictsDto(value);
      });
    }
  }, [courseId, fromDate, toDate, role]);

  const handleChangeAttendanceInTable = (
    studentId: StudentId,
    index: number,
    attendanceType: string
  ) => {
    setTable((prev) => {
      const newAttendance = BackToAttendanceType[attendanceType];
      const newTable = { ...prev };
      const updatedStudentAttendance = newTable.body.find(
        (bodyElement) => bodyElement.studentId === studentId
      ) as AttendanceTableBodyElement;
      updatedStudentAttendance.attendances[index] = newAttendance;
      return newTable;
    });
  };

  const style = {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
    outline: 'none',
  };

  const handlePageChange = (newPage: number) => {
    let newDate = fns.addDays(firstSeptemberStartWeek, newPage * 7);
    if (fns.isFuture(newDate)) {
      newDate = fns.startOfWeek(Date.now(), { weekStartsOn: 1 });
      newPage = fns.differenceInCalendarWeeks(newDate, firstSeptemberStartWeek);
    }
    setPage(newPage);
    setDate(newDate);
  };

  const handleAddAttendanceToStudent = (attendanceType: string) => {
    setTable((prev) => {
      const newAttendance = BackToAttendanceType[attendanceType];
      const newTable = { ...prev };
      newTable.body[currentStudentIndexInModal].attendances[
        currentAttendanceIndexInModal
      ] = newAttendance;
      return newTable;
    });
    setCurrentStudentIndexInModal(currentStudentIndexInModal + 1);
    if (currentStudentIndexInModal === table.body.length - 1) {
      handleCloseAddModal();
    }
  };

  const handleSaveTable = () => {
    dispatch(postAttendanceTable({ table, courseId, fromDate, toDate }));
  };

  const handleAddAttendancesOnCurrentDate = (
    classNumber: number,
    date: string
  ) => {
    setTable((prev) => {
      const newTable = { ...prev };
      if (fns.isAfter(Date.parse(date), Date.now())) {
        alert('Нельзя изменять будущую посещаемость.');
        return newTable;
      }
      if (
        role === UserRole.HEADMAN &&
        !fns.isSameWeek(Date.parse(date), Date.now())
      ) {
        console.log(fns.isSameWeek(Date.parse(date), Date.now()));
        alert('Староста не может изменять посещаемость за предыдущие недели.');
        return newTable;
      }
      const newTableHeader: AttendanceTableHeaderElement = {
        date,
        classNumber,
      };
      if (newTable.header.length === 0) {
        newTable.header.push(newTableHeader);
        newTable.body.forEach((element) => {
          element.attendances.push(null);
        });
        handleOpenAddModal(0);
        return newTable;
      }
      let indexToPush = newTable.header.length;
      while (indexToPush !== -1) {
        if (indexToPush === 0) {
          newTable.header.unshift(newTableHeader);
          newTable.body.forEach((element) => {
            element.attendances.unshift(null);
          });
        }
        if (date > newTable.header[indexToPush - 1].date) {
          newTable.header.splice(indexToPush, 0, newTableHeader);
          handleOpenAddModal(indexToPush);
          break;
        } else if (date === newTable.header[indexToPush - 1].date) {
          while (classNumber < newTable.header[indexToPush - 1].classNumber) {
            indexToPush--;
            if (indexToPush === 0) {
              newTable.header.unshift(newTableHeader);
              newTable.body.forEach((element) => {
                element.attendances.unshift(null);
              });
            }
          }
          if (classNumber === newTable.header[indexToPush - 1].classNumber) {
            return newTable;
          } else {
            newTable.header.splice(indexToPush, 0, newTableHeader);
            handleOpenAddModal(indexToPush);
            break;
          }
        }
        indexToPush--;
      }
      newTable.body.forEach((element) => {
        element.attendances.splice(indexToPush, 0, null);
      });
      return newTable;
    });
  };

  const handleOpenAddModal = (indexToPush: number) => {
    setCurrentAttendanceIndexInModal(indexToPush);
    setIsSetStudentAttendancesModalOpened(true);
  };

  const handleOpenNewDayModal = () => {
    setIsAddNewAttendanceModalOpened(true);
  };

  const onSubmit = (data: CreateDateClassNumberAttendance) => {
    const date = Date.parse(data.date);
    if (!fns.isSameYear(date, Date.now())) {
      alert('Нельзя устанавливать посещаемость за другие года.');
      return;
    }
    handleAddAttendancesOnCurrentDate(
      data.classNumber,
      fns.format(date, 'yyyy-MM-dd')
    );
    setIsAddNewAttendanceModalOpened(false);
  };

  const handleCloseAddModal = () => {
    setCurrentStudentIndexInModal(0);
    setCurrentAttendanceIndexInModal(0);
    setIsSetStudentAttendancesModalOpened(false);
  };

  const handleChangeWeek = (date: string) => {
    setPage(fns.differenceInWeeks(Date.parse(date), firstSeptemberStartWeek));
    setDate(
      fns.startOfWeek(date ? Date.parse(date) : Date.now(), { weekStartsOn: 1 })
    );
  };

  const checkWhichDatesIsDisabledToAddNewAttendance = (date: Date) => {
    const dateNow = new Date(Date.now());
    if (role === UserRole.HEADMAN) {
      return (
        fns.isFuture(date) ||
        !fns.isSameWeek(date, dateNow, { weekStartsOn: 1 })
      );
    } else {
      return fns.isBefore(
        date,
        getFirstSeptemberDate(dateNow) || fns.isFuture(date)
      );
    }
  };

  return (
    <>
      <PreLoading action={loadingAction}>
        <AttendanceTable
          table={table}
          handleChangeAttendance={handleChangeAttendanceInTable}
          count={count}
          page={page}
          onPageChange={handlePageChange}
          fromDate={fromDate}
          toDate={toDate}
          onAddClick={handleOpenNewDayModal}
          conflicts={conflictsDto.conflicts}
          onSaveButtonClick={handleSaveTable}
          onChangeWeek={handleChangeWeek}
          date={date}
        />
        <SetStudentsAttendancesModal
          isSetStudentAttendancesModalOpened={isAddModalOpened}
          onClose={() => handleCloseAddModal()}
          studentName={table.body[currentStudentIndexInModal]?.studentName}
          style={style}
          onAddAttendance={(attendanceType: string) =>
            handleAddAttendanceToStudent(attendanceType)
          }
        />
        <AddNewAttendanceModal
          datePickerProps={{
            shouldDisableDate: checkWhichDatesIsDisabledToAddNewAttendance,
            views: ['day'],
          }}
          isAddNewAttendanceModalOpened={isAddNewAttendanceModalOpened}
          onClose={() => setIsAddNewAttendanceModalOpened(false)}
          style={style}
          methods={methods}
          onSubmit={onSubmit}
        />
      </PreLoading>
    </>
  );
};

export default AttendanceJournal;
