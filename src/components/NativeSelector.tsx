import { useCallback, useMemo } from 'react';
import { FormControl, InputLabel, NativeSelect } from '@mui/material';

export interface NativeSelectorItem {
  id: number;
  name: string;
}

export interface NativeSelectorProps<T extends NativeSelectorItem> {
  items: T[];
  label: string;
  selected: number | null;
  onSelect: (id: number | null) => void;
  disabled?: boolean;
}

const NativeSelector = <T extends NativeSelectorItem>({
  items,
  label,
  selected,
  onSelect,
  disabled = false,
}: NativeSelectorProps<T>) => {
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
      items.map(({ id, name }) => (
        <option key={id} value={id.toString()}>
          {name}
        </option>
      )),
    [items]
  );

  return (
    <FormControl disabled={disabled} fullWidth>
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        {label}
      </InputLabel>
      <NativeSelect
        value={trueSelected}
        onChange={handleChange}
        inputProps={{
          name: 'item',
        }}
      >
        <option value=""></option>
        {renderedOptions}
      </NativeSelect>
    </FormControl>
  );
};

export default NativeSelector;
