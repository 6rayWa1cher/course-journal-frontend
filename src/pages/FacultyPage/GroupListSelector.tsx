import {
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
} from '@mui/material';
import { Box } from '@mui/system';
import { groupsByIdsAlphabeticalSelector } from '@redux/groups';
import EmptyListCaption from 'components/EmptyListCaption';
import { GroupId } from 'models/group';
import { useMemo } from 'react';
import { useParamSelector } from 'utils/hooks';

export interface GroupListSelectorProps {
  groupsIds?: GroupId[];
  selected: GroupId | null;
  onSelect: (groupId: GroupId | null) => void;
}

const GroupListSelector = ({
  groupsIds,
  selected,
  onSelect,
}: GroupListSelectorProps) => {
  const groups = useParamSelector(groupsByIdsAlphabeticalSelector, {
    ids: groupsIds ?? [],
  });
  const renderedOptions = useMemo(
    () =>
      groups.map(({ id, name }) => (
        <ListItemButton
          key={id}
          selected={selected === id}
          onClick={() => onSelect(id)}
        >
          <ListItemText primary={name} />
        </ListItemButton>
      )),
    [groups, selected, onSelect]
  );

  return (
    <Box sx={{ height: '300px' }}>
      {groups.length > 0 ? (
        <List>{renderedOptions}</List>
      ) : (
        <Stack justifyContent="center" height="100%">
          <EmptyListCaption />
        </Stack>
      )}
    </Box>
  );
};

export default GroupListSelector;
