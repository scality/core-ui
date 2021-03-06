//@flow
import React from 'react';
import styled from 'styled-components';
import * as defaultTheme from '../../style/theme';
import { getTheme, getThemePropSelector } from '../../utils';

const StyledTextBadge = styled.span`
  background-color: ${(props) => getTheme(props)[props.variant]};
  color: ${getThemePropSelector('textReverse')};
  padding: 2px ${defaultTheme.padding.smaller};
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: ${defaultTheme.fontWeight.bold};
  margin: 0 ${defaultTheme.padding.smaller} 0 ${defaultTheme.padding.smaller};
`;

type Props = {
  text: string,
  className?: string,
  variant?:
    | 'statusHealthy'
    | 'statusWarning'
    | 'statusCritical'
    | 'infoPrimary'
    | 'infoSecondary',
};
export default function TextBadge({
  text,
  variant = 'infoPrimary',
  className,
  ...rest
}: Props) {
  return (
    <StyledTextBadge
      className={['sc-text-badge', className].join(' ')}
      variant={variant}
      {...rest}
    >
      {text}
    </StyledTextBadge>
  );
}
