import { Divider, Grid } from '@mui/material';
import FormTextField from 'components/FormTextField';
import { useFormContext } from 'react-hook-form';
import { CreateTaskSchemaType } from 'validation/yup';
import FormCheckbox from 'components/FormCheckbox';
import CriteriaForm from './CriteriaForm';
import FormDateTimePicker from 'components/FormDateTimePicker';

const TaskForm = () => {
  const { control, watch } = useFormContext<CreateTaskSchemaType>();

  const deadlinesEnabled = watch('deadlinesEnabled');

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} container spacing={1}>
        <Grid item xs={12} sm>
          <FormTextField
            name="title"
            label="Название"
            control={control}
            variant="standard"
            margin="normal"
            type="text"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm>
          <FormTextField
            name="maxScore"
            label="Максимальное количество баллов"
            control={control}
            variant="standard"
            margin="normal"
            type="number"
            placeholder="10"
            required
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <FormTextField
          name="description"
          label="Описание"
          control={control}
          variant="standard"
          margin="normal"
          type="text"
          fullWidth
          multiline
          rows={4}
        />
      </Grid>
      <Grid item xs={12}>
        <Divider variant="middle" />
        <CriteriaForm />
      </Grid>
      <Grid item xs={12}>
        <FormCheckbox
          name="deadlinesEnabled"
          label="Включить учет сроков"
          control={control}
        />
        {deadlinesEnabled && (
          <Grid container spacing={1}>
            <Grid item xs={12} sm>
              <FormTextField
                name="maxPenaltyPercent"
                label="Максимальный процент штрафа"
                control={control}
                variant="standard"
                margin="normal"
                type="number"
                placeholder="50"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm>
              <FormDateTimePicker
                name="softDeadlineAt"
                label="Мягкий крайний срок"
                variant="standard"
                margin="normal"
                type="text"
                control={control}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm>
              <FormDateTimePicker
                name="hardDeadlineAt"
                label="Жесткий крайний срок"
                variant="standard"
                margin="normal"
                type="text"
                control={control}
                required
                fullWidth
              />
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default TaskForm;
