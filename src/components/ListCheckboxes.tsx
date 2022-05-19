import {
  Checkbox,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListProps,
} from '@mui/material';
import { difference, intersection, union, without } from 'lodash';
import { useCallback, useMemo, useState } from 'react';
import {
  FieldValues,
  FieldPath,
  Control,
  useController,
} from 'react-hook-form';

export interface ListCheckboxesSelectorProps<
  T extends FieldValues,
  J extends FieldPath<T>
> {
  options: {
    id: number;
    name: string;
    subName?: string;
  }[];
  name: J;
  control: Control<T>;
  listProps?: ListProps;
  selectAll?: boolean;
}

const ListCheckboxes = <T extends FieldValues, J extends FieldPath<T>>({
  options,
  name,
  control,
  listProps = {},
  selectAll = false,
}: ListCheckboxesSelectorProps<T, J>) => {
  const { field } = useController({
    control,
    name,
  });
  const [value, setValue] = useState<number[]>(field.value || []);

  const handleToggle = useCallback(
    (id: number) => () => {
      const newValue = value.includes(id) ? without(value, id) : [...value, id];
      field.onChange(newValue);
      setValue(newValue);
    },
    [field, value]
  );

  const [anyChecked, allChecked] = useMemo(() => {
    const intersect = intersection(
      value,
      options.map((o) => o.id)
    );
    return [intersect.length > 0, intersect.length === options.length];
  }, [options, value]);

  const handleAllToggle = useCallback(() => {
    const ids = options.map((o) => o.id);
    const newValue = !allChecked ? union(value, ids) : difference(value, ids);
    field.onChange(newValue);
    setValue(newValue);
  }, [allChecked, field, options, value]);

  return (
    <>
      <List {...listProps}>
        {selectAll && (
          <>
            <ListItem disablePadding>
              <ListItemButton role={undefined} onClick={handleAllToggle} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    indeterminate={anyChecked && !allChecked}
                    checked={allChecked}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText primary="Выбрать все" />
              </ListItemButton>
            </ListItem>
            <Divider variant="middle" />
          </>
        )}
        {options.map(({ id, name, subName }) => (
          <ListItem key={id} disablePadding>
            <ListItemButton role={undefined} onClick={handleToggle(id)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={value.includes(id)}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText primary={name} secondary={subName} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default ListCheckboxes;
