import { MenuItem, Select, SelectChangeEvent, TableCell } from '@mui/material';
import { AttendanceTableType } from 'models/attendance';
import { memo, useMemo, useState } from 'react';

const selectList = [
  AttendanceTableType.SERIOUS_REASON,
  AttendanceTableType.ATTENDED,
  AttendanceTableType.ABSEND,
];

const sx = { padding: '0px' };

const SelectCell = () => {
  const [selected, setSelected] = useState(
    AttendanceTableType.ATTENDED.toString()
  );

  const handleChange = (e: SelectChangeEvent) => {
    setSelected(e.target.value);
  };

  const renderComponent = useMemo(
    () => (
      <Select
        IconComponent={() => null}
        inputProps={{
          sx: {
            padding: '10px !important',
            width: '13px',
          },
        }}
        onChange={handleChange}
        value={selected}
      >
        {selectList.map((select, index) => (
          <MenuItem value={select} key={index}>
            {select}
          </MenuItem>
        ))}
      </Select>
    ),
    [selected]
  );
  return (
    <TableCell sx={sx} align="center">
      {renderComponent}
    </TableCell>
  );
};

export default memo(SelectCell);
