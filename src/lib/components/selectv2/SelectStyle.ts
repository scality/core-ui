import styled from 'styled-components';
import Select from 'react-select';
import { spacing, fontWeight, fontSize, zIndex } from '../../style/theme';
import { getThemePropSelector, getTheme } from '../../utils';
const SelectStyle = styled(Select)`
  font-size: ${fontSize.base};
  width: 23rem;
  ${({ isDefault }) => !isDefault && `font-weight: ${fontWeight.bold};`}
  .sc-select__control {
    padding-left: ${({ isDefault }) =>
      isDefault ? spacing.sp8 : spacing.sp16};
    cursor: pointer;
    ${({ isDefault }) =>
      isDefault
        ? `
      min-height: ${spacing.sp32};
      max-height: ${spacing.sp32};`
        : `
      min-height: ${spacing.sp24};
      max-height: ${spacing.sp24};
    `}
    caret-color: ${({ isDefault }) =>
      getThemePropSelector(isDefault ? 'textSecondary' : 'textPrimary')};
    background-color: ${({ isDefault }) =>
      getThemePropSelector(isDefault ? 'backgroundLevel1' : 'selectedActive')};
    height: auto;
    border-radius: ${({ isDefault }) =>
      isDefault ? spacing.sp4 : spacing.sp12};
    border: ${spacing.sp1} solid
      ${({ isDefault }) =>
        getThemePropSelector(isDefault ? 'border' : 'selectedActive')};

    &:hover {
      border: ${spacing.sp1} solid
        ${({ isDefault }) =>
          getThemePropSelector(isDefault ? 'infoPrimary' : 'selectedActive')};
      ${({ isDefault }) =>
        !isDefault && `background-color: ${getThemePropSelector('highlight')};`}
    }

    &.sc-select__control--is-disabled {
      pointer-events: auto;
      cursor: not-allowed;
      opacity: 0.5;

      &:hover {
        border: ${spacing.sp1} solid
          ${({ isDefault }) =>
            getThemePropSelector(isDefault ? 'border' : 'selectedActive')};
      }
    }

    &.sc-select__control--menu-is-open {
      ${(props) =>
        props.isDefault
          ? `background-color: ${getTheme(props).backgroundLevel1};`
          : `
            border-radius: ${
              props.isMenuBottom
                ? `${spacing.sp12} ${spacing.sp12} 0 0`
                : `0 0 ${spacing.sp12} ${spacing.sp12}`
            };
            background-color: ${getTheme(props).selectedActive} !important;
      `}
    }

    &.sc-select__control--is-focused {
      .sc-select__placeholder {
        ${(props) => props.isSearchable && `opacity: 0.5;`}
      }
      ${(props) =>
        props.isDefault
          ? `border-color: ${getTheme(props).infoPrimary};`
          : `
             border-color: ${getTheme(props).selectedActive};
             background-color: ${getTheme(props).highlight};
      `}
      box-shadow: none;
      outline: none;
    }

    .sc-select__input {
      ${({ isDefault }) => isDefault && `margin-top: ${spacing.sp1};`}
      color: ${getThemePropSelector('textPrimary')};

      & > input {
        font-weight: inherit;
        font-family: inherit;
      }
    }

    .sc-select__placeholder {
      font-style: italic;
      color: ${getThemePropSelector('textSecondary')};
    }

    .sc-select__value-container {
      ${({ isDefault }) => !isDefault && `max-height: ${spacing.sp24};`}
      padding: 0;

      input {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        opacity: 1 !important;
      }

      .value-container-icon {
        color: ${getThemePropSelector('textPrimary')};
        padding-right: ${spacing.sp4};
      }
    }

    .sc-select__single-value {
      color: ${getThemePropSelector('textPrimary')};
    }

    .sc-select__indicator,
    .sc-select__dropdown-indicator {
      padding: 0 ${spacing.sp8} 0 ${spacing.sp8};
      color: ${({ isDefault }) =>
        getThemePropSelector(isDefault ? 'textSecondary' : 'textPrimary')};
    }
  }

  .sc-select__menu {
    border: ${spacing.sp1} solid
      ${({ isDefault }) =>
        getThemePropSelector(isDefault ? 'border' : 'selectedActive')};
    ${(props) =>
      props.options &&
      props.options.length === 0 &&
      !props.isDefault &&
      `
      border: none;
    `}
    color: ${getThemePropSelector('textPrimary')};
    background-color: ${getThemePropSelector('backgroundLevel1')};
    box-sizing: border-box;
    overflow: hidden;
    margin: 0;
    ${(props) =>
      !props.isDefault &&
      `
        border-radius: ${
          props.isMenuBottom
            ? `0 0 ${spacing.sp12} ${spacing.sp12}`
            : `${spacing.sp12} ${spacing.sp12} 0 0`
        };
    `}
    z-index: ${zIndex.dropdown};

    .sc-select__menu-list {
      padding: 0;
      overflow: hidden;
      ${({ isDefault }) =>
        isDefault
          ? `
        max-height: calc(${spacing.sp32} * ${(props) =>
              props.ITEMS_PER_SCROLL_WINDOW} + ${spacing.sp32} / 2);`
          : `
        max-height: calc(${spacing.sp24} * ${(props) =>
              props.ITEMS_PER_SCROLL_WINDOW} + ${spacing.sp24} / 2);`}

      .sc-select__menu-notice {
        color: ${({ isDefault }) =>
          getThemePropSelector(isDefault ? 'textSecondary' : 'textPrimary')};
        &.sc-select__menu-notice--no-options {
          background-color: ${({ isDefault }) =>
            getThemePropSelector(
              isDefault ? 'backgroundLevel3' : 'selectedActive',
            )};
        }
      }

      div > .react-window-option > .sc-select__option,
      .sc-select__option {
        cursor: pointer;
        background-color: ${getThemePropSelector('backgroundLevel1')};
        height: ${({ isDefault }) => (isDefault ? spacing.sp32 : spacing.sp24)};
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: ${spacing.sp1} solid transparent;
        border-radius: 0;
        ${(props) =>
          props.isDefault &&
          `border-bottom: ${spacing.sp1} solid ${getTheme(props).border};`}
        padding: ${spacing.sp4} ${spacing.sp8} ${spacing.sp4}
          ${({ isDefault }) => (isDefault ? spacing.sp8 : spacing.sp16)};

        .option-icon {
          padding-right: ${spacing.sp4};
        }

        &.sc-select__option--is-focused {
          ${({ isDefault }) =>
            isDefault &&
            `background-color: ${getThemePropSelector('backgroundLevel1')};`}
          border: ${spacing.sp1} dashed
            ${getThemePropSelector('selectedActive')};
        }

        &.sc-select__option:hover {
          border: ${spacing.sp1} solid transparent;
          background-color: ${getThemePropSelector('highlight')};
        }

        &.sc-select__option--is-disabled {
          cursor: not-allowed;
          opacity: 50%;
          background-color: ${getThemePropSelector('backgroundLevel2')};
          font-style: italic;
          i {
            color: ${getThemePropSelector('textPrimary')};
          }
        }

        &.sc-select__option--is-selected {
          &:before {
            content: '';
            background: ${getThemePropSelector('selectedActive')};
            position: absolute;
            right: 0;
            height: ${spacing.sp24};
            width: ${spacing.sp4};
          }
          background-color: ${getThemePropSelector('highlight')};
        }

        &.sc-select__option--is-disabled:hover {
          opacity: 50%;
          background-color: ${getThemePropSelector('backgroundLevel2')};
        }

        .sc-highlighted-matching-text {
          color: ${getThemePropSelector('selectedActive')};
        }

        .option-value-wrapper {
          display: flex;
          align-items: center;
        }
      }

      ${({ isDefault }) =>
        isDefault &&
        `
          div > .react-window-option:first-of-type > .sc-select__option {
          .sc-select__option:first-of-type {
            border-radius: ${spacing.sp4} ${spacing.sp4} 0 0;
          }

          div > .react-window-option:last-of-type > .sc-select__option {
          .sc-select__option:last-of-type {
            border-bottom: ${spacing.sp1} solid transparent;
            border-radius: 0 0 ${spacing.sp4} ${spacing.sp4};
          }
        `}
    }
  }
`;
export { SelectStyle };
