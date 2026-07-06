import styled from 'styled-components';
import { spacing } from '../../spacing';
import { CoreUITheme } from '../../style/theme';
import { FocusVisibleStyle } from '../buttonv2/Buttonv2.component';

// Style-only props consumed by the Text family. styled-components v6 forwards
// unknown props to the DOM, so these are filtered here rather than reaching the
// rendered <span>. Kept as public prop names (not $-transient) to preserve the
// Text API for all consumers — the shared @styled-system/should-forward-prop
// filter (used by Box) can't be reused here because these are custom design
// flags, and `compact` is even a valid HTML attribute it would forward.
//
// Typed as Record<TextStyleProp, true> so the list can't silently drift: adding
// a style prop to TextStyleProp without listing it below is a compile error.
type TextStyleProp =
  | 'color'
  | 'variant'
  | 'isEmphazed'
  | 'isGentleEmphazed'
  | 'compact'
  | 'status'
  | 'statusColor'
  | 'alignRight';
const NON_DOM_TEXT_PROPS: Record<TextStyleProp, true> = {
  color: true,
  variant: true,
  isEmphazed: true,
  isGentleEmphazed: true,
  compact: true,
  status: true,
  statusColor: true,
  alignRight: true,
};
const forwardTextProp = (prop: string) => !(prop in NON_DOM_TEXT_PROPS);

export type TextVariant =
  | 'ChartTitle'
  | 'Basic'
  | 'Smaller'
  | 'Larger'
  | 'Large'
  | 'Small';

type Status = 'unknown' | 'healthy' | 'warning' | 'critical';
type Props = {
  children: React.ReactNode | string;
  status?: Status;
  id?: string;
} & TextProps;
type TextProps = {
  color?: keyof CoreUITheme;
  variant?: TextVariant;
  isEmphazed?: boolean;
  isGentleEmphazed?: boolean;
  compact?: boolean;
};
const BasicTextStyle = styled.span.withConfig({
  shouldForwardProp: forwardTextProp,
})`
  color: ${(props) => props.theme.textPrimary};
  font-size: 1rem;
  line-height: ${spacing.r24};
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
const StatusTextStyle = styled(BasicTextStyle) <{ statusColor: string }>`
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
const SmallerSecondaryTextStyle = styled(SmallerTextStyle)`
  color: ${(props) => props.theme.textSecondary};
`;
const getStatusColor = (status?: Status) => {
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

export const SmallerEmphaseTextStyle = styled(SmallerTextStyle) <{
  statusColor: string;
}>`
  font-weight: 700;
  color: ${(props) => props.theme[`${props.statusColor}`]};
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
export const GentleEmphaseSecondaryText = styled(SecondaryText) <{
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

export const Text = styled.span.withConfig({
  shouldForwardProp: forwardTextProp,
})<TextProps>`
  ${(props) => props.color && `color: ${props.theme[props.color]};`}
  ${(props) =>
    props.variant === 'Larger'
      ? `
  font-size: 1.43rem;
  line-height: 1.5;
      `
      : props.variant === 'Large'
        ? `
  font-size: 1.14rem;
  line-height: 1.5;
      `
        : props.variant === 'Smaller'
          ? `
  font-size: 0.71rem;
  line-height: 1.4;
  letter-spacing: 2%;// to be defined, percentage value is not valid
      `
          : props.variant === 'Small'
            ? `
  font-size: 0.85rem;
  line-height: 1.4;
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
    props.isGentleEmphazed
      ? `
  font-style: italic;
      `
      : ``}
    
  ${(props) =>
    props.variant === 'ChartTitle' && `letter-spacing: ${spacing.r2};`}

  ${(props) => props.compact && `line-height: 1.2;`}
`;
export const HelperText = ({ children, color, ...rest }: Props) => {
  return (
    <Text variant="Smaller" isEmphazed compact color={color} {...rest}>{children}</Text>
  );
}
export const Link = styled.a`
  font-size: 1rem;
  line-height: ${spacing.r24};
  color: ${(props) => props.theme.textLink};
  cursor: pointer;
  text-decoration-line: none;
  width: fit-content;
  &:hover {
    text-decoration-line: underline;
  }
  // :focus-visible is the keyboard-only version of :focus
  &:focus-visible {
    ${FocusVisibleStyle}
  }
`;
