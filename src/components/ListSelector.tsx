import { List, ListItemButton, ListItemText, Stack } from '@mui/material';
import { Box } from '@mui/system';
import EmptyListCaption from 'components/EmptyListCaption';
import { useMemo } from 'react';

export interface ListSelectorItem {
  id: number;
  name: string;
}

export interface ListSelectorProps<T extends ListSelectorItem> {
  items: T[];
  selected: number | null;
  onSelect: (id: number | null) => void;
}

const ListSelector = <T extends ListSelectorItem>({
  items,
  selected,
  onSelect,
}: ListSelectorProps<T>) => {
  const renderedOptions = useMemo(
    () =>
      items.map(({ id, name }) => (
        <ListItemButton
          key={id}
          selected={selected === id}
          onClick={() => onSelect(id)}
        >
          <ListItemText primary={name} />
        </ListItemButton>
      )),
    [items, selected, onSelect]
  );

  return (
    <Box>
      {items.length > 0 ? <List>{renderedOptions}</List> : <EmptyListCaption />}
    </Box>
  );
};

export default ListSelector;
