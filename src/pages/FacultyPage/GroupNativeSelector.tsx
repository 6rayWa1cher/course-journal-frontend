import { groupsByIdsAlphabeticalSelector } from '@redux/groups';
import { GroupId } from 'models/group';
import { useCallback, useMemo } from 'react';
import { useParamSelector } from 'utils/hooks';
import { FormControl, InputLabel, NativeSelect } from '@mui/material';

export interface GroupNativeSelectorProps {
  groupsIds?: GroupId[];
  selected: GroupId | null;
  onSelect: (groupId: GroupId | null) => void;
}

const GroupNativeSelector = ({
  groupsIds,
  selected,
  onSelect,
}: GroupNativeSelectorProps) => {
  const groups = useParamSelector(groupsByIdsAlphabeticalSelector, {
    ids: groupsIds ?? [],
  });
  const trueSelected = useMemo(
    () => (selected == null ? '' : selected.toString()),
    [selected]
  );
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const value = event.target.value;
      onSelect(value === '' ? null : Number(value));
    },
    [onSelect]
  );
  const renderedOptions = useMemo(
    () =>
      groups.map(({ id, name }) => (
        <option key={id} value={id.toString()}>
          {name}
        </option>
      )),
    [groups]
  );

  return (
    <FormControl fullWidth>
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        Группа
      </InputLabel>
      <NativeSelect
        value={trueSelected}
        onChange={handleChange}
        inputProps={{
          name: 'group',
        }}
      >
        <option value=""></option>
        {renderedOptions}
      </NativeSelect>
    </FormControl>
  );
};

export default GroupNativeSelector;
