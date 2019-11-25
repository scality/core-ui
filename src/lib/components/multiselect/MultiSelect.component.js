//@flow
import React from "react";
import styled from "styled-components";
import * as defaultTheme from "../../style/theme";
import CheckBox from "./../checkbox/Checkbox.component";
import Button from "./../button/Button.component";
import Select from "./../select/Select.component";
import { getThemeProp } from "../../utils";

export type ItemProps = {
  selected?: boolean,
  isFavorite?: boolean,
  label: string,
  description?: string,
  onSelect?: (any, any) => void, //on checkbox click
  onItemRemove?: (any, any) => void, //on item remove button click
  onFavoriteClick?: (any, any) => void // on Favorite icon click
};

export type OptionProps = {
  label: string,
  value: string | number
};

export type SearchProps = {
  placeholder?: string,
  options: Array<OptionProps>, //The options displayed in search suggestion
  onSelect: any => void, //on option click
  onAdd?: any => void,
  selectedOption: any
};

type MultiSelectProps = {
  title?: string,
  items: Array<ItemProps>,
  search?: SearchProps,
  onItemRemove?: (any, any) => void //on item remove button click
};

const MultiSelectContainer = styled.div`
  color: ${getThemeProp('text')};
`;

const MultiSelectTitle = styled.h3`
  padding: ${defaultTheme.padding.base} 0;
  margin: 0;
  font-weight: ${defaultTheme.fontWeight.bold};
  font-size: ${defaultTheme.fontSize.large};
`;

const MultiSelectItemContainer = styled.div`
  margin: ${defaultTheme.padding.smaller} 0;
  padding: ${defaultTheme.padding.small} 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid gray;
  &:last-child {
    border: none;
  }
`;

const MultiSelectSearchContainer = styled.div`
  display: flex;
  .sc-select-container {
    width: 100%;
  }
  .sc-button {
    margin: 0 ${defaultTheme.padding.small};
  }
`;

const MultiSelectItemLeft = styled.div`
  .sc-checkbox,
  .sc-button {
    margin: 0 ${defaultTheme.padding.small};
  }
`;
const MultiSelectItemCenter = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: space-between;
`;
const MultiSelectItemRight = styled.div`
  padding: 0 ${defaultTheme.padding.base};
`;

const MultiSelectItemLabel = styled.span`
  font-size: ${defaultTheme.fontSize.large};
`;

const MultiSelectItemDescription = styled.span``;

function MultiSelectItem(props: ItemProps) {
  const {
    selected,
    label,
    description,
    onItemRemove,
    onSelect,
    isFavorite,
    onFavoriteClick
  } = props;

  return (
    <MultiSelectItemContainer className="sc-multi-select-item">
      <MultiSelectItemLeft className="sc-multi-select-item-left">
        {typeof selected === "boolean" && onSelect && (
          <CheckBox
            checked={selected}
            onChange={event => onSelect(label, event)}
          />
        )}
        {typeof isFavorite === "boolean" && onFavoriteClick && (
          <Button
            inverted={true}
            icon={<i className={`${isFavorite ? "fas" : "far"} fa-star`} />}
            onClick={event => onFavoriteClick(label, event)}
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
            variant="danger"
            onClick={event => onItemRemove(label, event)}
            icon={<i className="fas fa-trash" />}
          />
        )}
      </MultiSelectItemRight>
    </MultiSelectItemContainer>
  );
}

function MultiSelectSearch(props: SearchProps) {
  const {
    selectedOption,
    options,
    placeholder,
    onSelect,
    onAdd,
    ...rest
  } = props;
  return (
    <MultiSelectSearchContainer className="sc-multi-select-list-search">
      <Select
        options={options}
        onChange={onSelect}
        placeholder={placeholder}
        value={selectedOption}
        {...rest}
      />
      {onAdd && <Button onClick={onAdd} icon={<i className="fas fa-plus" />} />}
    </MultiSelectSearchContainer>
  );
}

function MultiSelectList({
  title = "",
  items = [],
  search,
  onItemRemove
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

export default MultiSelectList;
