import { StudentDto } from 'models/student';
import * as React from 'react';
import Table, { tableClasses } from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material';
import SelectCell from './SelectCell';
import {
  AttendanceTableBodyElement,
  AttendanceTableDto,
  AttendanceTableHeaderElement,
} from 'models/attendance';

interface AttendanceTableProps {
  table: AttendanceTableDto;
}

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.root}`]: {
    borderBottomWidth: 0,
  },
}));

const LeftBorderedTable = styled(Table)(() => ({
  [`&.${tableClasses.root}`]: {
    borderLeft: '1px solid rgba(81, 81, 81, 1)',
  },
}));

const AttendanceTable = ({ table }: AttendanceTableProps) => {
  console.log(table.header);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Группа</TableCell>
            <TableCell>Имя студента</TableCell>
            <TableCell colSpan={1000} align="center" padding="none">
              <LeftBorderedTable padding="none">
                <TableBody>
                  <TableRow>
                    <StyledTableCell align="center" colSpan={100}>
                      Посещаемость
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center" colSpan={2}>
                      10.05.2022
                    </TableCell>
                    <TableCell align="center" colSpan={1}>
                      12.05.2022
                    </TableCell>
                    <TableCell align="center" colSpan={2}>
                      17.05.2022
                    </TableCell>
                    <TableCell align="center" colSpan={1}>
                      19.05.2022
                    </TableCell>
                    <TableCell align="center" colSpan={2}>
                      24.05.2022
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">2</TableCell>
                    <TableCell align="center">3</TableCell>
                    <TableCell align="center">1</TableCell>
                    <TableCell align="center">2</TableCell>
                    <TableCell align="center">3</TableCell>
                    <TableCell align="center">1</TableCell>
                    <TableCell align="center">2</TableCell>
                    <TableCell align="center">3</TableCell>
                  </TableRow>
                </TableBody>
              </LeftBorderedTable>
            </TableCell>
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
              <SelectCell />
              <SelectCell />
              <SelectCell />
              <SelectCell />
              <SelectCell />
              <SelectCell />
              <SelectCell />
              <SelectCell />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AttendanceTable;
