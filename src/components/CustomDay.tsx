import * as React from 'react';
import { styled } from '@mui/material/styles';
import { TextFieldProps } from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import * as fns from 'date-fns';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';

type CustomPickerDayProps = PickersDayProps<Date> & {
  dayIsBetween: boolean;
  isFirstDay: boolean;
  isLastDay: boolean;
};

type CustomDayProps = DatePickerProps<Date, Date> & {
  date: Date;
  onChange: (date: Date) => void;
  renderInput: (
    props: TextFieldProps
  ) => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  mask: string;
  shouldDisableDate: (date: Date) => boolean;
};

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== 'dayIsBetween' && prop !== 'isFirstDay' && prop !== 'isLastDay',
})<CustomPickerDayProps>(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
  ...(dayIsBetween && {
    borderRadius: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
  ...(isFirstDay && {
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
  }),
  ...(isLastDay && {
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
  }),
})) as React.ComponentType<CustomPickerDayProps>;

const CustomDay = ({
  date,
  onChange,
  renderInput,
  ...other
}: CustomDayProps) => {
  const renderWeekPickerDay = (
    day: Date,
    selectedDates: Array<Date | null>,
    pickersDayProps: PickersDayProps<Date>
  ) => {
    if (!date) {
      return <PickersDay {...pickersDayProps} />;
    }

    const start = fns.startOfWeek(date);
    const end = fns.endOfWeek(date);

    const dayIsBetween = fns.isWithinInterval(day, { start, end });
    const isFirstDay = fns.isSameDay(day, start);
    const isLastDay = fns.isSameDay(day, end);

    return (
      <CustomPickersDay
        {...pickersDayProps}
        disableMargin
        dayIsBetween={dayIsBetween}
        isFirstDay={isFirstDay}
        isLastDay={isLastDay}
      />
    );
  };

  const handleChange = (date: Date | null) => {
    onChange(date as Date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        onChange={handleChange}
        renderDay={renderWeekPickerDay}
        renderInput={renderInput}
        {...other}
      />
    </LocalizationProvider>
  );
};

export default CustomDay;
