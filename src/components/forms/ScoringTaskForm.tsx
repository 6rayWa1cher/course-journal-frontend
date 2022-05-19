import {
  Grid,
  IconButton,
  Typography,
  Collapse,
  Divider,
  Avatar,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { criteriaByTaskSelector } from '@redux/criteria';
import { taskByIdSelector } from '@redux/tasks';
import { Fragment, useCallback, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useParamSelector } from 'utils/hooks';
import { BatchSetSubmissionsSchemaType } from 'validation/yup/submission';
import ListCheckboxes from 'components/ListCheckboxes';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import React from 'react';

export interface ScoringTaskFormProps {
  index: number;
  asListItem?: boolean;
  fold?: boolean;
}

const ScoringTaskForm = ({
  index,
  asListItem = false,
  fold = false,
}: ScoringTaskFormProps) => {
  const { watch, control } = useFormContext<BatchSetSubmissionsSchemaType>();
  const [show, setShow] = useState<boolean>(false);

  const taskId = watch(`submissions.${index}.task`);

  const task = useParamSelector(taskByIdSelector, { taskId });
  const criteria = useParamSelector(criteriaByTaskSelector, { taskId });
  const criteriaItems = useMemo(
    () =>
      criteria.map((c) => ({
        id: c.id,
        name: c.name,
      })),
    [criteria]
  );

  const body = (
    <ListCheckboxes
      name={`submissions.${index}.satisfiedCriteria`}
      options={criteriaItems}
      control={control}
      selectAll={criteriaItems.length > 1}
    />
  );

  const handleShowClick = useCallback(() => setShow((s) => !s), [setShow]);

  const OuterComponent = asListItem ? List : Fragment;

  return (
    // <>
    //   <Grid container spacing={1}>
    //     <Grid item xs>
    //       <Typography variant="h5">{task?.title}</Typography>
    //     </Grid>
    //     {fold && (
    //       <Grid item>
    //         <IconButton onClick={handleShowClick}>
    //           {!show ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
    //         </IconButton>
    //       </Grid>
    //     )}
    //   </Grid>
    //   {fold ? (
    //     <Collapse in={show}>
    //       <Divider />
    //       {body}
    //     </Collapse>
    //   ) : (
    //     body
    //   )}
    // </>
    <OuterComponent>
      <ListItemButton onClick={handleShowClick}>
        <ListItemAvatar>
          <Avatar>{task?.taskNumber}</Avatar>
        </ListItemAvatar>
        <ListItemText primary={task?.title} />
        {show ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={show} timeout="auto" unmountOnExit>
        {body}
      </Collapse>
    </OuterComponent>
  );
};

export default ScoringTaskForm;
