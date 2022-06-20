import { Grid } from '@mui/material';
import FormDatePicker from 'components/FormDatePicker';
import FormTextField from 'components/FormTextField';
import { useFormContext } from 'react-hook-form';
import { CreateDateClassNumberAttendance } from 'validation/yup/attendance';

const AttendanceTimeForm = () => {
  const { control } = useFormContext<CreateDateClassNumberAttendance>();

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm>
        <Grid item xs={12} sm>
          <FormTextField
            name={`classNumber`}
            label="Номер пары"
            control={control}
            variant="standard"
            margin="normal"
            type="number"
            placeholder="50"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm>
          <FormDatePicker
            name="date"
            label="Дата пары"
            variant="standard"
            margin="normal"
            type="text"
            control={control}
            required
            fullWidth
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AttendanceTimeForm;
