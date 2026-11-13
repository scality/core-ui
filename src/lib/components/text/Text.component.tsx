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
export type TextProps = {
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
/**
 * The `compact` line height, exported so a caller aligning against a compact line
 * box reads this number rather than a copy that can drift.
 */
export const COMPACT_LINE_HEIGHT = 1.2;

const ChartTitleTextStyle = styled(BasicTextStyle)`
  letter-spacing: ${spacing.r2};
`;
/**
 * Body text at the design system's default size and weight, in the primary
 * text color. Equivalent to `<Text color="textPrimary">`; a bare `<Text>`
 * inherits its color instead.
 */
export function BasicText({ children, ...rest }: Props) {
  return <BasicTextStyle {...rest}>{children}</BasicTextStyle>;
}
/**
 * Body text in the muted secondary color, for a label or a caption sitting
 * beside the value it describes. Equivalent to `<Text color="textSecondary">`.
 */
export function SecondaryText({ children, ...rest }: Props) {
  return <SecondaryTextStyle {...rest}>{children}</SecondaryTextStyle>;
}
/**
 * The largest step of the type scale, for the heading that names a page or a
 * panel. Equivalent to `<Text variant="Larger" color="textPrimary">`.
 */
export function LargerText({ children, ...rest }: Props) {
  return <LargerTextStyle {...rest}>{children}</LargerTextStyle>;
}
/**
 * Body text in bold, to pick one value out of the text around it. Equivalent
 * to `<Text isEmphazed color="textPrimary">`.
 */
export function EmphaseText({ children, ...rest }: Props) {
  return <EmphaseTextStyle {...rest}>{children}</EmphaseTextStyle>;
}
/**
 * Body text colored from a health status rather than from a theme key, so the
 * caller passes the status and not the color it maps to. `Text` takes the
 * theme key itself (`statusHealthy`, `statusWarning`…), so the caller must do
 * that mapping.
 */
export function StatusText({ children, status, ...rest }: Props) {
  const statusColor = getStatusColor(status);
  return (
    <StatusTextStyle statusColor={statusColor} {...rest}>
      {children}
    </StatusTextStyle>
  );
}
/**
 * One step above body text, for a section heading inside a page rather than
 * the page's own title. Equivalent to `<Text variant="Large"
 * color="textPrimary">`.
 */
export function LargeText({ children, ...rest }: Props) {
  return <LargetStyle {...rest}>{children}</LargetStyle>;
}
/**
 * The smallest step of the type scale, for dense secondary information such as
 * a table's units or a timestamp. Equivalent to `<Text variant="Smaller"
 * color="textPrimary">`.
 */
export function SmallerText({ children, ...rest }: Props) {
  return <SmallerTextStyle {...rest}>{children}</SmallerTextStyle>;
}
/**
 * The smallest step of the type scale in the muted secondary color, for dense
 * supporting detail. Equivalent to `<Text variant="Smaller"
 * color="textSecondary">`.
 */
export function SmallerSecondaryText({ children, ...rest }: Props) {
  return (
    <SmallerSecondaryTextStyle {...rest}>{children}</SmallerSecondaryTextStyle>
  );
}
/**
 * The smallest step of the type scale, in bold, colored from a health status
 * the way StatusText is. With no status behind it, equivalent to
 * `<Text variant="Smaller" isEmphazed color="textSecondary">`.
 */
export function SmallerEmphaseText({ children, status, ...rest }: Props) {
  const statusColor = getStatusColor(status);
  return (
    <SmallerEmphaseTextStyle statusColor={statusColor} {...rest}>
      {children}
    </SmallerEmphaseTextStyle>
  );
}

/**
 * Body text with the extra letter-spacing charts use, for the title sitting
 * above a graph. Equivalent to `<Text variant="ChartTitle"
 * color="textPrimary">`.
 */
export function ChartTitleText({ children, ...rest }: Props) {
  return <ChartTitleTextStyle {...rest}>{children}</ChartTitleTextStyle>;
}
/**
 * Secondary body text in italics, for an aside or an editorial note, with
 * `alignRight` to push it to the end of its line. Equivalent to
 * `<Text color="textSecondary" isGentleEmphazed>`.
 */
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

/**
 * The text primitive the design system's type scale is expressed through:
 * `variant` picks the size, `isEmphazed` the weight, `isGentleEmphazed`
 * italics and `color` any theme color key. Reach for it rather than one of
 * the fixed-purpose components in this file, which mostly pin one combination
 * of those props and cannot be adjusted.
 */
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

  ${(props) => props.compact && `line-height: ${COMPACT_LINE_HEIGHT};`}
`;
/**
 * The short hint accompanying a form field, set tight under the control rather
 * than spaced like body text. Equivalent to
 * `<Text variant="Smaller" isEmphazed compact>`.
 */
export const HelperText = ({ children, color, ...rest }: Props) => {
  return (
    <Text variant="Smaller" isEmphazed compact color={color} {...rest}>{children}</Text>
  );
}
/**
 * An anchor carrying the theme's link color, an underline on hover and the
 * keyboard focus ring. For navigation that changes the page; an action that
 * stays on the current page is a Button, even when it looks like a link.
 */
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
