import { Button, Grid } from '@mui/material';

export interface ClearSubmitButtonProps {
  submitLabel?: string;
}

const ClearSubmitButton = ({ submitLabel }: ClearSubmitButtonProps) => (
  <Grid container sx={{ p: (theme) => theme.spacing(2, 0, 1) }} spacing={2}>
    <Grid item xs={12} md={6}>
      <Button type="reset" fullWidth variant="outlined">
        Очистить
      </Button>
    </Grid>
    <Grid item xs={12} md={6}>
      <Button type="submit" fullWidth variant="contained" color="primary">
        {submitLabel ?? 'Отправить'}
      </Button>
    </Grid>
  </Grid>
);

export default ClearSubmitButton;
