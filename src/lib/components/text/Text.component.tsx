import * as React from 'react';
import styled from 'styled-components';
import { getTheme } from '../../utils';
import { spacing } from '../../style/theme';
type Status = 'unknown' | 'healthy' | 'warning' | 'critical';
type Props = {
  children: React.ReactNode | string;
  status?: Status;
};
const BasicTextStyle = styled.span`
  color: ${(props) => getTheme(props).textPrimary};
  font-size: 1rem;
  line-height: ${spacing.sp20};
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
// TODO
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
const ChartTitleTextStyle = styled(BasicTextStyle)`
  letter-spacing: ${spacing.sp2};
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
export function ChartTitleText({ children, ...rest }: Props) {
  return <ChartTitleTextStyle {...rest}>{children}</ChartTitleTextStyle>;
}
