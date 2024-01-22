// @ts-nocheck
import styled from 'styled-components';
import { spacing } from '../../spacing';
import { fontWeight } from '../../style/theme';
import { getThemePropSelector } from '../../utils';
const StyledTextBadge = styled.span`
  ${({ theme, variant }) => `
      background-color: ${theme[variant]};
      color: ${
        variant === 'infoSecondary' ? theme.textPrimary : theme.textReverse
      };
      padding: 2px ${spacing.r4};
      border-radius: 4px;
      font-size: 0.9rem;
      font-weight: ${fontWeight.bold};
      margin: 0 ${spacing.r4} 0 ${spacing.r4};
    `}
`;
type Props = {
  text: string;
  className?: string;
  variant?:
    | 'statusHealthy'
    | 'statusWarning'
    | 'statusCritical'
    | 'infoPrimary'
    | 'infoSecondary';
};
export function TextBadge({
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
