import React from 'react';
import styled from 'styled-components';
import Select from '../selectv2/Selectv2.component';
import Icon from '../icon/Icon.component';
import * as defaultTheme from '../../style/theme';
import { getThemePropSelector } from '../../utils';

export const SingleValueWrapper = styled.div`
  color: ${defaultTheme.white};
  margin-left: ${defaultTheme.spacing.sp2}
  margin-right: ${defaultTheme.spacing.sp2}
  max-width: calc(100% - 8px);
  position: absolute;
  display: flex;
  align-items: center;
  height: 100%;
  top: 0;
`;

export const ValueIcon = styled.span`
  margin: 0 ${defaultTheme.spacing.sp4};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const OptionIcon = styled.span`
  width: 35px;
  margin-right: ${defaultTheme.spacing.sp4};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const OptionWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: flex-start;
  overflow: hidden;
  line-height: 18px;
`;

export const OptionLabel = styled.span`
  display: flex;
  align-items: bottom;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
}
`;

export const SelectStyle = styled(Select)`
  .sc-select__control {
    background-color: ${getThemePropSelector('buttonSecondary')};

    &.sc-select__control--is-focused {
      background-color: ${getThemePropSelector('buttonSecondary')};
    }
    .sc-select__value-container {
      overflow: visible;
    }

    &.sc-select__control--menu-is-open {
      .sc-select__indicator {
        transform: rotate(180deg);
      }
    }
  }
`;

export const ShortLabel = styled.p`
  white-space: nowrap;
`;

export const icons = {
  all: (
    <svg viewBox="0 0 150 100" xmlns="http://www.w3.org/2000/svg" height="16px">
      <circle
        cx="50"
        cy="50"
        r="50"
        fill={defaultTheme.brand['statusHealthy']}
      />
      <circle
        cx="75"
        cy="50"
        r="50"
        fill={defaultTheme.brand['statusWarning']}
      />
      <circle
        cx="100"
        cy="50"
        r="50"
        fill={defaultTheme.brand['statusCritical']}
      />
    </svg>
  ),
  healthy: <Icon name={'Check-circle'} color={'statusHealthy'} size={'lg'} />,
  warning: (
    <Icon name={'Exclamation-circle'} color={'statusWarning'} size={'lg'} />
  ),
  critical: <Icon name={'Times-circle'} color={'statusCritical'} size={'lg'} />,
  unknown: <Icon name={'Info'} color={'infoPrimary'} size={'lg'} />,
};
