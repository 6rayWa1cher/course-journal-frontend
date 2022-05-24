import { Grid, Tooltip, Typography } from '@mui/material';
import AddButton from 'components/buttons/AddButton';
import DeleteButton from 'components/buttons/DeleteButton';
import FormTextField from 'components/FormTextField';
import SubTitle from 'components/SubTitle';
import { compact, sum } from 'lodash';
import { useMemo, useCallback } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { CreateTaskSchemaType } from 'validation/yup';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { ErrorMessage } from '@hookform/error-message';

const CriteriaForm = () => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<CreateTaskSchemaType>();

  const {
    fields: criteriaFields,
    append: criteriaAppend,
    remove: criteriaRemove,
  } = useFieldArray({
    control,
    name: 'criteria',
  });

  const percents = watch(
    useMemo(
      () =>
        criteriaFields.map(
          (_, index) => `criteria.${index}.criteriaPercent`
        ) as `criteria.${number}.criteriaPercent`[],
      [criteriaFields]
    )
  );

  const percentsSum = useMemo(
    () => sum(compact(percents).map(Number)),
    [percents]
  );

  const sumEqualsToHundred = percentsSum === 100;

  const handleDeleteClick = useCallback(
    (index: number) => () => criteriaRemove(index),
    [criteriaRemove]
  );

  const handleAddClick = useCallback(
    () =>
      criteriaAppend({
        name: undefined,
        criteriaPercent:
          0 < percentsSum && percentsSum < 100 ? 100 - percentsSum : undefined,
      }),
    [criteriaAppend, percentsSum]
  );

  const renderedCriteriaFields = useMemo(
    () =>
      criteriaFields.map(({ id }, index) => (
        <Grid key={id} container spacing={1}>
          <Grid item xs={12} sm>
            <FormTextField
              name={`criteria.${index}.name`}
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
              name={`criteria.${index}.criteriaPercent`}
              label="Процентный вес критерия"
              control={control}
              variant="standard"
              margin="normal"
              type="number"
              placeholder="50"
              fullWidth
              required
            />
          </Grid>
          {criteriaFields.length > 1 && (
            <Grid
              item
              sm={1}
              container
              alignItems="center"
              justifyContent="center"
            >
              <Grid item>
                <DeleteButton onClick={handleDeleteClick(index)} />
              </Grid>
            </Grid>
          )}
        </Grid>
      )),
    [control, criteriaFields, handleDeleteClick]
  );

  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
        sx={{ pt: 2 }}
      >
        <Grid item xs>
          <SubTitle>Критерии</SubTitle>
        </Grid>
        {!sumEqualsToHundred && (
          <Grid item>
            <Tooltip title="Сумма процентов не равна 100">
              <WarningAmberIcon color="warning" />
            </Tooltip>
          </Grid>
        )}
        <Grid item>
          <AddButton onClick={handleAddClick} />
        </Grid>
      </Grid>
      <ErrorMessage
        errors={errors}
        name="criteria"
        render={({ message }) => (
          <Typography variant="caption" color="error">
            {message}
          </Typography>
        )}
      />
      {renderedCriteriaFields}
    </>
  );
};

export default CriteriaForm;
