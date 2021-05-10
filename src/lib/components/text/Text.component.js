//@flow
import React from 'react';
import styled from 'styled-components';

export type Props = {
  children: string,
  status?: 'unknown' | 'healthy' | 'warning' | 'critical',
};

const BasicTextStyle = styled.span`
  color: ${(props) => props.theme.textPrimary};
  font-size: 1rem;
  line-height: 1.71rem;
  font-weight: 400;
`;

const SecondaryTextStyle = styled(BasicTextStyle)`
  color: ${(props) => props.theme.textSecondary};
`;

const LargerTextStyle = styled(BasicTextStyle)`
  font-size: 1.43rem;
  line-height: 1.5;
`;

const EmphaseTextStyle = styled(BasicTextStyle)`
  font-weight: 700;
`;

const StatusTextStyle = styled(BasicTextStyle)`
  color: ${(props) => props.theme[`${props.statusColor}`]};
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

export function BasicText({ children }: Props) {
  return <BasicTextStyle>{children}</BasicTextStyle>;
}

export function SecondaryText({ children }: Props) {
  return <SecondaryTextStyle>{children}</SecondaryTextStyle>;
}

export function LargerText({ children }: Props) {
  return <LargerTextStyle>{children}</LargerTextStyle>;
}

export function EmphaseText({ children }: Props) {
  return <EmphaseTextStyle>{children}</EmphaseTextStyle>;
}

export function StatusText({ children, status }: Props) {
  let statusColor;
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
    <StatusTextStyle statusColor={statusColor}>{children}</StatusTextStyle>
  );
}

export function LargeText({ children }: Props) {
  return <LargetStyle>{children}</LargetStyle>;
}

export function SmallerText({ children }: Props) {
  return <SmallerTextStyle>{children}</SmallerTextStyle>;
}
