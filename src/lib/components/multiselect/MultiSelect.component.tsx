import styled from 'styled-components';
import { spacing } from '../../spacing';
import { fontSize, fontWeight } from '../../style/theme';
import { getThemePropSelector } from '../../utils';
import { Icon } from '../icon/Icon.component';
import { Button } from './../button/Button.component';
import { Checkbox } from './../checkbox/Checkbox.component';
import { Select } from './../select/Select.component';

export type ItemProps = {
  selected?: boolean;
  label: string;
  description?: string;
  onSelect?: (arg0: any, arg1: any) => void;
  //on checkbox click
  onItemRemove?: (arg0: any, arg1: any) => void;
};
export type OptionProps = {
  label: string;
  value: string | number;
};
export type SearchProps = {
  placeholder?: string;
  options: Array<OptionProps>;
  //The options displayed in search suggestion
  onSelect: (arg0: any) => void;
  //on option click
  onAdd?: (arg0: any) => void;
  selectedOption: any;
};
type MultiSelectProps = {
  title?: string;
  items: Array<ItemProps>;
  search?: SearchProps;
  onItemRemove?: (arg0: any, arg1: any) => void; //on item remove button click
};
const MultiSelectContainer = styled.div`
  color: ${getThemePropSelector('textPrimary')};
`;
const MultiSelectTitle = styled.h3`
  padding: ${spacing.r16} 0;
  margin: 0;
  font-weight: ${fontWeight.bold};
  font-size: ${fontSize.large};
`;
const MultiSelectItemContainer = styled.div`
  margin: ${spacing.r4} 0;
  padding: ${spacing.r8} 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid gray;
  &:last-child {
    border: none;
  }
`;
const MultiSelectSearchContainer = styled.div`
  display: flex;
  align-items: center;
  .sc-select-container {
    width: 100%;
  }
  .sc-button {
    margin: 0 ${spacing.r8};
  }
`;
const MultiSelectItemLeft = styled.div`
  .sc-checkbox,
  .sc-button {
    margin: 0 ${spacing.r8};
  }
`;
const MultiSelectItemCenter = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: space-between;
`;
const MultiSelectItemRight = styled.div`
  padding: 0 ${spacing.r16};
`;
const MultiSelectItemLabel = styled.span`
  font-size: ${fontSize.large};
`;
const MultiSelectItemDescription = styled.span``;

function MultiSelectItem(props: ItemProps) {
  const { selected, label, description, onItemRemove, onSelect } = props;
  return (
    <MultiSelectItemContainer className="sc-multi-select-item">
      <MultiSelectItemLeft className="sc-multi-select-item-left">
        {typeof selected === 'boolean' && onSelect && (
          <Checkbox
            checked={selected}
            onChange={(event) => onSelect(label, event)}
          />
        )}
      </MultiSelectItemLeft>
      <MultiSelectItemCenter className="sc-multi-select-item-center">
        <MultiSelectItemLabel className="sc-multi-select-item-label">
          {label}
        </MultiSelectItemLabel>
        {description && (
          <MultiSelectItemDescription className="sc-multi-select-item-description">
            {description}
          </MultiSelectItemDescription>
        )}
      </MultiSelectItemCenter>
      <MultiSelectItemRight className="sc-multi-select-item-right">
        {onItemRemove && (
          <Button
            inverted={true}
            variant="buttonDelete"
            onClick={(event) => onItemRemove(label, event)}
            icon={<Icon name="Delete" />}
          />
        )}
      </MultiSelectItemRight>
    </MultiSelectItemContainer>
  );
}

function MultiSelectSearch(props: SearchProps) {
  const { selectedOption, onSelect, onAdd, ...rest } = props;
  return (
    <MultiSelectSearchContainer className="sc-multi-select-list-search">
      <Select
        // @ts-ignore
        onChange={onSelect}
        value={selectedOption}
        {...rest}
      />
      {onAdd && <Button onClick={onAdd} icon={<Icon name="Create-add" />} />}
    </MultiSelectSearchContainer>
  );
}

function MultiSelectList({
  title = '',
  items = [],
  search,
  onItemRemove,
}: MultiSelectProps) {
  return (
    <MultiSelectContainer className="sc-multi-select-list">
      {title && <MultiSelectTitle>{title}</MultiSelectTitle>}
      {search && <MultiSelectSearch {...search} />}
      {items.map((item, index) => (
        <MultiSelectItem
          key={`sc-multi-select-item-${index}`}
          onItemRemove={onItemRemove}
          {...item}
        />
      ))}
    </MultiSelectContainer>
  );
}

export const MultiSelect = MultiSelectList;
