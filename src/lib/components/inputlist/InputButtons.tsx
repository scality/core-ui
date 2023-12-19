import styled, { CSSProperties } from 'styled-components';
import { Button } from '../buttonv2/Buttonv2.component';
import { useCallback, useMemo } from 'react';
import { Box } from '../box/Box';
import { Icon } from '../icon/Icon.component';

const CustomButton = styled(Button)<{ isVisible?: boolean }>`
  ${(props) =>
    !props.isVisible
      ? `
        display: none;
    `
      : ''}
`;
const isEmptyItem = (item) => item.key === '' && item.value === '';

type AddButtonProps<T = unknown> = {
  index: number;
  items: Array<T>;
  insertEntry: () => void;
  disabled?: boolean;
  iconStyle?: CSSProperties;
};

export const AddButton = ({
  index,
  items,
  insertEntry,
  disabled,
  iconStyle,
}: AddButtonProps) => {
  const itemsLength = items.length;
  const itemsIndex = items[index];
  const itemsIndexKey = (items[index] as { key: string }).key;
  const itemsIndexValue = (items[index] as { value: string }).value;

  const isDisabled = useMemo(() => {
    if (itemsIndex && itemsIndexKey === '' && itemsIndexValue === '') {
      return true;
    }
    return disabled || false;
  }, [itemsIndex, itemsIndexKey, itemsIndexValue, disabled]);

  const isVisible = useMemo(() => {
    return !(itemsLength > 0 && index !== itemsLength - 1);
  }, [itemsLength, index]);

  const onClickFn = useCallback(() => {
    if (!(itemsLength > 0 && index !== itemsLength - 1)) {
      insertEntry();
    }
  }, [itemsLength, index, insertEntry]);

  return (
    <>
      {!isVisible && <Box ml={16} />}
      <CustomButton
        isVisible={isVisible}
        type="button"
        variant="outline"
        disabled={isDisabled}
        name={`addbtn${index}`}
        id={`addbtn${index}`}
        onClick={onClickFn}
        aria-label={`Add${index}`}
        tooltip={{
          overlay: 'Add',
          placement: 'top',
        }}
        icon={<Icon name="Add-plus" />}
      />
    </>
  );
};
type SubButtonProps<T = unknown> = {
  index: number;
  items: Array<T>;
  deleteEntry: (arg0: number) => void;
  disabled?: boolean;
  iconStyle?: CSSProperties;
};
export const SubButton = ({
  index,
  items,
  deleteEntry,
  disabled,
  iconStyle,
}: SubButtonProps) => {
  let isDisabled = disabled || false;

  if (items.length === 1 && isEmptyItem(items[0])) {
    isDisabled = true;
  }

  return (
    <Button
      variant="danger"
      type="button"
      disabled={isDisabled}
      aria-label={`Remove${index}`}
      name={`delbtn${index}`}
      id={`delbtn${index}`}
      onClick={() => deleteEntry(index)}
      tooltip={{
        overlay: 'Remove',
        placement: 'top',
      }}
      icon={<Icon name="Remove-minus" />}
    />
  );
};
