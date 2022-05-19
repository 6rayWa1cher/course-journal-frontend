import {
  Typography,
  Collapse,
  Divider,
  Avatar,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Box,
} from '@mui/material';
import { criteriaByTaskSelector } from '@redux/criteria';
import { taskByIdSelector } from '@redux/tasks';
import { Fragment, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useParamSelector } from 'utils/hooks';
import { BatchSetSubmissionsSchemaType } from 'validation/yup/submission';
import ListCheckboxes from 'components/ListCheckboxes';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { submissionByStudentAndTaskSelector } from '@redux/submissions';
import { sumBy } from 'lodash';
import FormTextField from 'components/FormTextField';
import FormDateTimePicker from 'components/FormDateTimePicker';

export interface ScoringTaskFormProps {
  index: number;
  asListItem?: boolean;
  open: boolean;
  onOpenClick: () => void;
}

const ScoringTaskForm = ({
  index,
  asListItem = false,
  open,
  onOpenClick,
}: ScoringTaskFormProps) => {
  const { watch, control } = useFormContext<BatchSetSubmissionsSchemaType>();

  const taskId = watch(`submissions.${index}.task`);
  const studentId = watch('studentId');

  const task = useParamSelector(taskByIdSelector, { taskId });
  const criteria = useParamSelector(criteriaByTaskSelector, { taskId });
  const normalizeConstant = useMemo(() => {
    const sum = sumBy(criteria, 'criteriaPercent');
    return sum != 0 ? 100 / sum : 0;
  }, [criteria]);
  const criteriaItems = useMemo(
    () =>
      criteria.map((c) => ({
        id: c.id,
        name: c.name,
        subName: `${Math.round(c.criteriaPercent * normalizeConstant)}%`,
      })),
    [criteria, normalizeConstant]
  );
  const submission = useParamSelector(submissionByStudentAndTaskSelector, {
    taskId,
    studentId,
  });

  const body = (
    <>
      <ListCheckboxes
        name={`submissions.${index}.satisfiedCriteria`}
        options={criteriaItems}
        control={control}
        selectAll
      />
      {submission != null && (
        <Box sx={{ px: 2, pb: 2 }}>
          <FormDateTimePicker
            name={`submissions.${index}.submittedAt`}
            label="Дата и время сдачи"
            variant="standard"
            margin="normal"
            type="text"
            size="small"
            control={control}
            required
            fullWidth
          />
          <Typography>
            Осн. баллы: {submission.mainScore}/{task?.maxScore}
          </Typography>
          <FormTextField
            name={`submissions.${index}.additionalScore`}
            label="Доп. баллы"
            control={control}
            variant="standard"
            margin="normal"
            type="number"
            size="small"
            fullWidth
            required
          />
          <Typography>
            Итого: {submission.mainScore + submission.additionalScore}/
            {task?.maxScore}
          </Typography>
        </Box>
      )}
      <Divider />
    </>
  );

  const OuterComponent = asListItem ? List : Fragment;

  return (
    <OuterComponent>
      <ListItemButton onClick={onOpenClick}>
        <ListItemAvatar>
          <Avatar>{task?.taskNumber}</Avatar>
        </ListItemAvatar>
        <ListItemText primary={task?.title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {body}
      </Collapse>
    </OuterComponent>
  );
};

export default ScoringTaskForm;
