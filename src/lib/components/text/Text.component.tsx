import * as React from 'react';
import styled from 'styled-components';
import { spacing } from '../../spacing';
import { defaultTheme } from '../../style/theme';
import { getTheme } from '../../utils';
type Status = 'unknown' | 'healthy' | 'warning' | 'critical';
type Props = {
  children: React.ReactNode | string;
  status?: Status;
  id?: string;
};
const BasicTextStyle = styled.span`
  color: ${(props) => getTheme(props).textPrimary};
  font-size: 1rem;
  line-height: ${spacing.r24};
  font-weight: 400;
`;
const SecondaryTextStyle = styled(BasicTextStyle)`
  color: ${(props) => getTheme(props).textSecondary};
`;
const LargerTextStyle = styled(BasicTextStyle)`
  font-size: 1.43rem;
  line-height: 1.5;
`;
const EmphaseTextStyle = styled(BasicTextStyle)`
  font-weight: 700;
`;
const StatusTextStyle = styled(BasicTextStyle)<{ statusColor: string }>`
  color: ${(props) => getTheme(props)[`${props.statusColor}`]};
`;
const LargetStyle = styled(BasicTextStyle)`
  font-size: 1.14rem;
  line-height: 1.5;
`;
const SmallerTextStyle = styled(BasicTextStyle)`
  font-size: 0.71rem;
  line-height: 1.4;
  letter-spacing: 2%; // to be defined, percentage value is not valid
`;
const SmallerSecondaryTextStyle = styled(SmallerTextStyle)`
  color: ${(props) => getTheme(props).textSecondary};
`;
const getStatusColor = (status: Status) => {
  let statusColor: string;

  switch (status) {
    case 'healthy':
      statusColor = 'statusHealthy';
      break;

    case 'warning':
      statusColor = 'statusWarning';
      break;

    case 'critical':
      statusColor = 'statusCritical';
      break;

    default:
      statusColor = 'textSecondary';
  }
  return statusColor;
};

export const SmallerEmphaseTextStyle = styled(SmallerTextStyle)<{
  statusColor: string;
}>`
  font-weight: 700;
  color: ${(props) => getTheme(props)[`${props.statusColor}`]};
`;
const ChartTitleTextStyle = styled(BasicTextStyle)`
  letter-spacing: ${spacing.r2};
`;
export function BasicText({ children, ...rest }: Props) {
  return <BasicTextStyle {...rest}>{children}</BasicTextStyle>;
}
export function SecondaryText({ children, ...rest }: Props) {
  return <SecondaryTextStyle {...rest}>{children}</SecondaryTextStyle>;
}
export function LargerText({ children, ...rest }: Props) {
  return <LargerTextStyle {...rest}>{children}</LargerTextStyle>;
}
export function EmphaseText({ children, ...rest }: Props) {
  return <EmphaseTextStyle {...rest}>{children}</EmphaseTextStyle>;
}
export function StatusText({ children, status, ...rest }: Props) {
  const statusColor = getStatusColor(status);
  return (
    <StatusTextStyle statusColor={statusColor} {...rest}>
      {children}
    </StatusTextStyle>
  );
}
export function LargeText({ children, ...rest }: Props) {
  return <LargetStyle {...rest}>{children}</LargetStyle>;
}
export function SmallerText({ children, ...rest }: Props) {
  return <SmallerTextStyle {...rest}>{children}</SmallerTextStyle>;
}
export function SmallerSecondaryText({ children, ...rest }: Props) {
  return (
    <SmallerSecondaryTextStyle {...rest}>{children}</SmallerSecondaryTextStyle>
  );
}
export function SmallerEmphaseText({ children, status, ...rest }: Props) {
  const statusColor = getStatusColor(status);
  return (
    <SmallerEmphaseTextStyle statusColor={statusColor} {...rest}>
      {children}
    </SmallerEmphaseTextStyle>
  );
}

export function ChartTitleText({ children, ...rest }: Props) {
  return <ChartTitleTextStyle {...rest}>{children}</ChartTitleTextStyle>;
}
export const GentleEmphaseSecondaryText = styled(SecondaryText)<{
  alignRight?: boolean;
}>`
  font-style: italic;
  ${(props) =>
    props.alignRight
      ? `
    text-align: right;
    display: block;
  `
      : ''}
`;

export const Text = styled.span<{
  variant?: 'ChartTitle' | 'Basic' | 'Smaller' | 'Larger';
  color?: keyof typeof defaultTheme.darkRebrand;
  isEmphazed?: boolean;
}>`
  color: ${(props) => getTheme(props)[props.color || 'textPrimary']};
  ${(props) =>
    props.variant === 'Basic' || props.variant === 'ChartTitle'
      ? `
  font-size: 1rem;
  line-height: ${spacing.r24};
  `
      : props.variant === 'Larger'
      ? `
  font-size: 1.43rem;
  line-height: 1.5;
      `
      : props.variant === 'Smaller'
      ? `
  font-size: 0.71rem;
  line-height: 1.4;
  letter-spacing: 2%;// to be defined, percentage value is not valid
      `
      : `
  font-size: 1rem;
  line-height: ${spacing.r24};
      `}

  ${(props) =>
    props.isEmphazed
      ? `
  font-weight: 700;
      `
      : `
  font-weight: 400;
      `}
    
  ${(props) =>
    props.variant === 'ChartTitle' && `letter-spacing: ${spacing.r2};`}
`;
