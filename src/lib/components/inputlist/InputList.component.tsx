import { HTMLProps, forwardRef } from 'react';
import { RefCallBack } from 'react-hook-form';
import { Box } from '../box/Box';
import { Input } from '../inputv2/inputv2';
import { AddButton, SubButton } from './InputButtons';

export type InputListProps<T> = HTMLProps<HTMLInputElement> & {
  ref: RefCallBack;
  min?: string | number;
  max?: string | number;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  required?: boolean;
  disabled?: boolean;
  maxItems?: number;
  value: T[];
};

function InternalInputList<
  T extends string | number | readonly string[] | undefined,
>(
  {
    onChange,
    onBlur,
    min,
    max,
    maxLength,
    minLength,
    pattern,
    required,
    disabled,
    maxItems,
    value,
    name,
    ...rest
  }: InputListProps<T>,
  _,
) {
  const isMaxItemsReached =
    maxItems !== undefined && maxItems !== null && value.length === maxItems;

  const insertEntry = () => {
    if (!isMaxItemsReached) {
      onChange?.({
        target: { value: [...(value ?? []), ''] },
      } as unknown as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const deleteEntry = (entryIndex: number) => {
    const newValues = value.filter((_, index) => index !== entryIndex);
    const updatedValues = newValues.length === 0 ? ([''] as T[]) : newValues;

    onChange?.({
      target: { value: updatedValues },
    } as unknown as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <>
      {value.map((val, index) => (
        <Box display="flex" gap="0.25rem" alignItems="center" key={index}>
          <Input
            id={`${name}[${index}]`}
            aria-label={`${name}${index}`}
            inputSize={'1/2'}
            value={val}
            onChange={(evt) => {
              const tempValues = [...value];
              tempValues[index] = evt.target.value as T;
              onChange?.({
                target: { value: tempValues },
              } as unknown as React.ChangeEvent<HTMLInputElement>);
            }}
            {...rest}
          />
          <SubButton
            index={index}
            key={`${name}-delete-${value.join(',') + index}`}
            deleteEntry={deleteEntry}
            items={value}
            disabled={value.length === 1 && value[0] === ''}
          />
          <AddButton
            index={index}
            key={`${name}-add-${value.join(',') + index}`}
            insertEntry={insertEntry}
            items={value}
            disabled={val === '' || isMaxItemsReached}
          />
        </Box>
      ))}
    </>
  );
}

export const InputList = forwardRef(InternalInputList);
