import {
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TableCell,
} from '@mui/material';
import { AttendanceTableType } from 'models/attendance';
import React, { memo } from 'react';
import WarningAmberSharp from '@mui/icons-material/WarningAmberSharp';

interface SelectCellProps {
  handleAdditionChange: (attendance: string) => void;
  value: string;
  disabled: boolean;
  handleAlertConflict: () => void;
  blocked: boolean;
  selectList: string[];
}

const sx = { padding: '0px' };

const SelectCell: React.FC<SelectCellProps> = ({
  handleAdditionChange,
  value,
  disabled,
  handleAlertConflict,
  blocked,
  selectList = [
    AttendanceTableType.SERIOUS_REASON,
    AttendanceTableType.ATTENDED,
    AttendanceTableType.null,
  ],
}) => {
  const handleChange = (e: SelectChangeEvent<string>) => {
    handleAdditionChange(AttendanceTableType[e.target.value]);
  };

  return (
    <TableCell sx={sx} align="center">
      {disabled ? (
        <Button
          variant="contained"
          color="error"
          onClick={handleAlertConflict}
          sx={{
            overflow: 'hidden',
            width: '33px',
            padding: '10px',
            minWidth: '0px',
          }}
        >
          <WarningAmberSharp />
        </Button>
      ) : (
        <Select
          IconComponent={() => null}
          inputProps={{
            sx: {
              padding: '10px !important',
              width: '13px',
              border: disabled ? '2px solid red' : '',
            },
          }}
          MenuProps={{
            sx: {
              borderColor: 'red',
            },
          }}
          onChange={handleChange}
          value={disabled ? '' : value}
          displayEmpty={disabled}
          disabled={blocked}
        >
          {selectList.map((select, index) => (
            <MenuItem value={select} key={index}>
              {select}
            </MenuItem>
          ))}
        </Select>
      )}
    </TableCell>
  );
};

export default memo(SelectCell);
