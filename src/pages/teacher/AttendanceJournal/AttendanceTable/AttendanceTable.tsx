import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, styled } from '@mui/material';
import {
  AttendanceTableBodyElement,
  AttendanceTableConflict,
  AttendanceTableDto,
  AttendanceTableType,
} from 'models/attendance';
import * as fns from 'date-fns';
import { StudentId } from 'models/student';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddButton from 'components/buttons/AddButton';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import SelectCell from 'components/SelectCell';
import { Box } from '@mui/system';
import { useMemo } from 'react';
import CustomDay from 'components/CustomDay';

interface AttendanceTableProps {
  table: AttendanceTableDto;
  handleChangeAttendance: (
    studentId: StudentId,
    index: number,
    attendanceType: string
  ) => void;
  count: number;
  page: number;
  onPageChange: (newPage: number) => void;
  fromDate: string;
  toDate: string;
  onAddClick: () => void;
  conflicts: AttendanceTableConflict[];
  onSaveButtonClick: () => void;
  onChangeWeek: (date: string) => void;
  date: Date;
}

const dayOfWeekParser = {
  '1': 'Понедельник',
  '2': 'Вторник',
  '3': 'Среда',
  '4': 'Четверг',
  '5': 'Пятница',
  '6': 'Суббота',
  '0': 'Воскресенье',
};

type SplitedTableHeaderElement = {
  date: string;
  classes: number[];
};

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.root}`]: {
    borderBottomWidth: 0,
  },
}));

const RightMarginedButton = styled(Button)`
  margin-right: 10px;
`;

const AttendanceTable: React.FC<AttendanceTableProps> = ({
  table,
  handleChangeAttendance,
  count,
  page,
  onPageChange,
  fromDate,
  toDate,
  onAddClick,
  conflicts,
  onSaveButtonClick,
  onChangeWeek,
  date,
}) => {
  const splitCoursesByDates = useMemo<SplitedTableHeaderElement[]>(() => {
    const header = table.header;
    if (header.length === 0) {
      return [];
    }
    let date = header[0].date;
    const splitedHeader = [];
    let classes: number[] = [];
    for (const headerElement of header) {
      if (headerElement.date === date) {
        classes.push(headerElement.classNumber);
      } else {
        splitedHeader.push({
          date: date,
          classes: classes,
        });
        classes = [headerElement.classNumber];
        date = headerElement.date;
      }
    }
    splitedHeader.push({
      date: date,
      classes: classes,
    });
    return splitedHeader;
  }, [table]);

  const handleFirstPageClick = () => {
    onPageChange(0);
  };

  const handlePrevPageClick = () => {
    onPageChange(page - 1);
  };

  const handleNextPageClick = () => {
    onPageChange(page + 1);
  };

  const handleLastPageClick = () => {
    onPageChange(count);
  };

  const handleChangeWeek = (date: Date | null) => {
    onChangeWeek(fns.format(date ?? Date.now(), 'yyyy-MM-dd'));
  };

  const handleAlertConflict = (
    teacherName: string | undefined,
    courseName: string | undefined
  ) => {
    alert(
      'Данный студент уже присутсвовал на паре "' +
        courseName +
        '" у преподавателя ' +
        teacherName +
        '.'
    );
  };

  const FlexDiv = styled('div')`
    margin: 10px 40px;
    display: flex;
    justify-content: right;
    align-items: center;
  `;

  const CenteredTextDiv = styled('div')`
    text-align: center;
    margin-right: 10px;
    margin-left: 10px;
    height: min-content;
  `;

  const splitedCourses: SplitedTableHeaderElement[] = splitCoursesByDates;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center" colSpan={100}>
              Посещаемость
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ height: '80.5px' }} align="center" colSpan={2}>
              {fromDate} &mdash; {toDate}
            </TableCell>
            {splitedCourses.map((course, index) => (
              <TableCell
                key={index}
                align="center"
                colSpan={course.classes.length}
              >
                {course.date} <br />{' '}
                {dayOfWeekParser[fns.getDay(fns.parseISO(course.date))]}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell align="center" sx={{ width: 100 }}>
              Группа
            </TableCell>
            <TableCell>Имя студента</TableCell>
            {splitedCourses.map((course, index) =>
              course.classes.map((c, index2) => (
                <TableCell
                  align="center"
                  key={index.toString() + index2.toString()}
                >
                  {c} пара
                </TableCell>
              ))
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {table.body.map((body: AttendanceTableBodyElement) => (
            <TableRow
              key={body.studentId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {body.studentGroup}
              </TableCell>
              <TableCell>{body.studentName}</TableCell>
              {body.attendances.map((attendance, index) => {
                const conflict = conflicts.find(
                  (conflict) =>
                    conflict.attendedDate === table.header[index].date &&
                    conflict.attendedClass ===
                      table.header[index].classNumber &&
                    conflict.studentId === body.studentId
                );
                return (
                  <SelectCell
                    key={index}
                    value={
                      attendance !== null
                        ? AttendanceTableType[attendance]
                        : AttendanceTableType['null']
                    }
                    handleAdditionChange={(attendance: string) => {
                      handleChangeAttendance(body.studentId, index, attendance);
                    }}
                    handleAlertConflict={() =>
                      handleAlertConflict(
                        conflict?.conflictedTeacherFullName,
                        conflict?.conflictedCourseName
                      )
                    }
                    disabled={
                      conflicts.find(
                        (conflict) =>
                          conflict.attendedDate === table.header[index].date &&
                          conflict.attendedClass ===
                            table.header[index].classNumber &&
                          conflict.studentId === body.studentId
                      ) !== undefined
                    }
                    blocked={!fns.isSameWeek(Date.now(), date)}
                    selectList={[
                      AttendanceTableType.SERIOUS_REASON,
                      AttendanceTableType.ATTENDED,
                      AttendanceTableType.null,
                    ]}
                  />
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <FlexDiv>
        <RightMarginedButton
          variant="contained"
          color="success"
          onClick={onSaveButtonClick}
        >
          Сохранить изменения
        </RightMarginedButton>
        <CustomDay
          date={date}
          value={date}
          onChange={handleChangeWeek}
          mask=""
          shouldDisableDate={(date: Date) => fns.isFuture(date)}
          renderInput={({ inputRef, inputProps, InputProps }) => (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginRight: '20px',
              }}
            >
              <input
                ref={inputRef}
                {...inputProps}
                onChange={() => null}
                style={{
                  zIndex: Number.MIN_SAFE_INTEGER,
                  width: '0',
                  height: '50px',
                }}
              />
              {InputProps?.endAdornment}
            </Box>
          )}
        />
        <CenteredTextDiv>
          {page} из {count}
        </CenteredTextDiv>
        <RightMarginedButton
          onClick={handleFirstPageClick}
          disabled={0 === page}
        >
          <KeyboardDoubleArrowLeftIcon />
        </RightMarginedButton>
        <RightMarginedButton
          onClick={handlePrevPageClick}
          disabled={0 === page}
        >
          <ArrowBackIcon />
        </RightMarginedButton>
        <RightMarginedButton
          onClick={handleNextPageClick}
          disabled={count === page || fns.isFuture(fns.addDays(date, 7))}
        >
          <ArrowForwardIcon />
        </RightMarginedButton>
        <RightMarginedButton
          onClick={handleLastPageClick}
          disabled={count === page || fns.isFuture(fns.addDays(date, 7))}
        >
          <KeyboardDoubleArrowRightIcon />
        </RightMarginedButton>
        <AddButton onClick={onAddClick} />
      </FlexDiv>
    </TableContainer>
  );
};

export default AttendanceTable;
