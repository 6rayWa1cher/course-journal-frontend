// import React, { useCallback, useState } from 'react';
// import {
//   Checkbox,
//   CheckboxProps,
//   FormControlLabel,
//   FormHelperText,
// } from '@mui/material';
// import {
//   Control,
//   FieldPath,
//   FieldValues,
//   useController,
// } from 'react-hook-form';

// export interface FormCheckboxProps<
//   T extends FieldValues,
//   J extends FieldPath<T>
// > {
//   name: J;
//   items: {
//     id: number;
//     label: string;
//   }[];
//   checkAll: boolean;
//   control: Control<T>;
// }

// const FormCheckbox = <T extends FieldValues, J extends FieldPath<T>>({
//   name,
//   items,
//   control,
//   ...fieldProps
// }: FormCheckboxProps<T, J> & CheckboxProps) => {
//   const {
//     field,
//     fieldState: { error },
//   } = useController({
//     name,
//     control,
//   });

//   const [value, setValue] = useState<number[]>((field.value as number[]) || []);

//   const handleChange = useCallback(
//     (id: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
//       const valueCopy = new Set(value);
//       if (e.target.checked) {
//         valueCopy.add(id);
//       } else {
//         valueCopy.delete(id);
//       }
//       const newValue = Array.from(valueCopy);

//       field.onChange(newValue);
//       setValue(newValue);
//     },
//     [field, value]
//   );

//   return (
//     <>
//       {items.map(({ id, label }) => (
//         <FormControlLabel
//           key={id}
//           control={
//             <Checkbox
//               id={name}
//               checked={value.includes(id)}
//               onChange={handleChange(id)}
//               {...fieldProps}
//             />
//           }
//           label={label}
//         />
//       ))}
//       {error != null && <FormHelperText error>{error.message}</FormHelperText>}
//     </>
//   );
// };

// export default FormCheckbox;
export {};
