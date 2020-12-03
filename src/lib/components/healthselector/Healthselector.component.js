//@flow
import React, { useState, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { getThemePropSelector } from '../../utils';
import { ButtonStyled } from '../button/Button.component';
import * as defaultTheme from '../../style/theme';

export type Item = {
  label: string,
  selected?: boolean,
  onClick: (any) => void,
};
type Items = Array<Item>;

type Props = {
  size?: string,
  variant?: string,
  items: Items,
};

const HealthselectorContainer = styled.div`
  position: relative;
  user-select: none;
  cursor: pointer;
`;

const CSSCircle = styled.span`
  background-color: ${(props) => defaultTheme.brand[props.variant]};
  border-radius: 50%;
  display: inline-block;
`;

const CircleWrapper = styled.span`
  width: 100%;
`;

const ThreeCirclesWrapper = styled.span`
  display: flex;
  width: 100%;
  justify-content: center;
  ${CSSCircle}:first-child {
    margin-right: -7%;
  }
  ${CSSCircle}:last-child {
    margin-left: -7%;
  }
`;

const TriggerStyled = styled(ButtonStyled)`
  box-sizing: border-box;
  background-color: ${getThemePropSelector('primary')};
  color: ${getThemePropSelector('textPrimary')};
  &:hover {
    background-color: ${getThemePropSelector('primaryDark2')};
  }
  &:active {
    background-color: ${getThemePropSelector('primaryDark2')};
  }
  border-radius: 4px;

  ${(props) => {
    if (props.opened)
      return css`
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;

        ul li:last-child {
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
        }
      `;
  }}

  ${(props) => {
    switch (props.size) {
      case 'smaller':
        return css`
          ${CSSCircle} {
            width: 8px;
            height: 8px;
          }

          padding: ${defaultTheme.padding.smaller};
          width: 100px;
          ul {
            width: 100px;
            li {
              padding: ${defaultTheme.padding.smaller};
            }
          }
        `;
      case 'small':
        return css`
          ${CSSCircle} {
            width: 10px;
            height: 10px;
          }

          padding: ${defaultTheme.padding.small};
          width: 110px;
          ul {
            width: 110px;
            li {
              padding: ${defaultTheme.padding.small};
            }
          }
        `;
      case 'large':
        return css`
          ${CSSCircle} {
            width: 12px;
            height: 12px;
          }

          padding: ${defaultTheme.padding.large};
          width: 150px;
          ul {
            width: 150px;
            li {
              padding: ${defaultTheme.padding.large};
            }
          }
        `;
      case 'larger':
        return css`
          ${CSSCircle} {
            width: 15px;
            height: 15px;
          }

          padding: ${defaultTheme.padding.larger};
          width: 190px;
          ul {
            width: 190px;
            li {
              padding: ${defaultTheme.padding.larger};
            }
          }
        `;
      default:
        return css`
          ${CSSCircle} {
            width: 11px;
            height: 11px;
          }

          padding: ${defaultTheme.padding.base};
          width: 130px;
          ul {
            width: 130px;
            li {
              padding: ${defaultTheme.padding.base};
            }
          }
        `;
    }
  }}
`;

const LeftRowWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 40%;
`;
const RightRowWrapper = styled.div`
  width: 60%;
  text-align: left;
  padding-left: 10%;
`;

const HealthSelectorMenu = styled.ul`
  box-sizing: border-box;
  position: absolute;
  margin: 0;
  padding: 0;
  z-index: ${defaultTheme.zIndex.dropdown};

  ${(props) => {
    if (
      props.size &&
      props.triggerSize &&
      props.triggerSize.x + props.size.width > window.innerWidth
    ) {
      return css`
        right: 0;
        top: 100%;
      `;
    } else if (
      props.size &&
      props.triggerSize &&
      props.triggerSize.y + props.size.height > window.innerHeight
    ) {
      return css`
        left: 0;
        bottom: ${props.triggerSize.height + 'px'};
      `;
    } else {
      return css`
        left: 0;
        top: 100%;
      `;
    }
  }};
`;

const HealthSelectorMenuItem = styled.li`
  display: flex;
  align-items: center;
  white-space: nowrap;
  cursor: pointer;
  justify-content: space-around;

  ${css`
    background-color: ${getThemePropSelector('primary')};
    color: ${getThemePropSelector('textPrimary')};
    &:hover {
      background-color: ${getThemePropSelector('primaryDark2')};
    }
    &:active {
      background-color: ${getThemePropSelector('primaryDark2')};
    }
  `};
`;

function Healthselector(props: Props) {
  const { variant, size, items } = props;
  const [open, setOpen] = useState(false);
  const [menuSize, setMenuSize] = useState();
  const [triggerSize, setTriggerSize] = useState();
  const selected = items.find((item) => item.selected);
  const selectedIndex =
    items.indexOf(selected) >= 0 ? items.indexOf(selected) : 0;

  const refMenuCallback = useCallback((node) => {
    if (node !== null) {
      setMenuSize(node.getBoundingClientRect());
    }
  }, []);

  const refTriggerCallback = useCallback((node) => {
    if (node !== null) {
      setTriggerSize(node.getBoundingClientRect());
    }
  }, []);

  const icons = [
    <ThreeCirclesWrapper>
      <CSSCircle variant="healthy" />
      <CSSCircle variant="warning" />
      <CSSCircle variant="danger" />
    </ThreeCirclesWrapper>,
    <CircleWrapper>
      <CSSCircle variant="healthy" />
    </CircleWrapper>,
    <CircleWrapper>
      <CSSCircle variant="warning" />
    </CircleWrapper>,
    <CircleWrapper>
      <CSSCircle variant="danger" />
    </CircleWrapper>,
  ];

  return (
    <HealthselectorContainer className="sc-healthselector">
      <TriggerStyled
        variant={variant || 'base'}
        size={size || 'base'}
        className="trigger"
        ref={refTriggerCallback}
        onBlur={() => setOpen(false)}
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        opened={open}
      >
        <LeftRowWrapper>{icons[selectedIndex]}</LeftRowWrapper>
        <RightRowWrapper>{(selected && selected.label) || ''}</RightRowWrapper>
        {open && (
          <HealthSelectorMenu
            ref={refMenuCallback}
            size={menuSize}
            triggerSize={triggerSize}
          >
            <HealthSelectorMenuItem
              onClick={items && items[0] && items[0].onClick}
            >
              <LeftRowWrapper>{icons[0]}</LeftRowWrapper>
              <RightRowWrapper>
                {(items[0] && items[0].label) || 'All'}
              </RightRowWrapper>
            </HealthSelectorMenuItem>
            <HealthSelectorMenuItem
              onClick={items && items[1] && items[1].onClick}
            >
              <LeftRowWrapper>{icons[1]}</LeftRowWrapper>
              <RightRowWrapper>
                {(items[1] && items[1].label) || 'Ok'}
              </RightRowWrapper>
            </HealthSelectorMenuItem>
            <HealthSelectorMenuItem
              onClick={items && items[2] && items[2].onClick}
            >
              <LeftRowWrapper>{icons[2]}</LeftRowWrapper>
              <RightRowWrapper>
                {(items[2] && items[2].label) || 'Warning'}
              </RightRowWrapper>
            </HealthSelectorMenuItem>
            <HealthSelectorMenuItem
              onClick={items && items[3] && items[3].onClick}
            >
              <LeftRowWrapper>{icons[3]}</LeftRowWrapper>
              <RightRowWrapper>
                {(items[3] && items[3].label) || 'Critical'}
              </RightRowWrapper>
            </HealthSelectorMenuItem>
          </HealthSelectorMenu>
        )}
      </TriggerStyled>
    </HealthselectorContainer>
  );
}

export default Healthselector;
