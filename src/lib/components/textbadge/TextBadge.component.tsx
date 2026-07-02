import styled from 'styled-components';
import { spacing } from '../../spacing';
import { fontWeight } from '../../style/theme';
import { Icon } from '../icon/Icon.component';

type TextBadgeVariant =
  | 'statusHealthy'
  | 'statusWarning'
  | 'statusCritical'
  | 'infoPrimary'
  | 'infoSecondary'
  | 'selectedActive';

// Lets callers drive the badge colors directly instead of picking one of the
// fixed `variant`s — e.g. a per-item color computed at runtime. When set, it
// also gives the badge a border (the `variant` badges have none).
export type TextBadgeCustomColor = {
  /** Text color, and border color unless `borderColor` is given. */
  text: string;
  /** Background color. */
  backgroundColor: string;
  /** Border color. Falls back to `text`. */
  borderColor?: string;
};

const StyledTextBadge = styled.span<{
  $variant: TextBadgeVariant;
  $customColor?: TextBadgeCustomColor;
  $removable: boolean;
}>`
  ${({ theme, $variant, $customColor, $removable }) => `
      ${$removable ? `display: inline-flex; align-items: center; gap: ${spacing.r4};` : ''}
      background-color: ${$customColor ? $customColor.backgroundColor : theme[$variant]};
      color: ${
        $customColor
          ? $customColor.text
          : $variant === 'infoSecondary'
            ? theme.textPrimary
            : theme.textReverse
      };
      ${$customColor ? `border: 1px solid ${$customColor.borderColor ?? $customColor.text};` : ''}
      padding: 2px ${spacing.r4};
      border-radius: 4px;
      font-size: 0.9rem;
      font-weight: ${fontWeight.bold};
      margin: 0 ${spacing.r4} 0 ${spacing.r4};
    `}
`;

const RemoveButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background: none;
  color: inherit;
  cursor: pointer;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }
`;

type Props = {
  text: React.ReactNode;
  className?: string;
  variant?: TextBadgeVariant;
  /** Override the variant colors with explicit ones (and add a border). */
  customColor?: TextBadgeCustomColor;
  /**
   * When provided, a trailing "✕" button is rendered and this is called when
   * the user clicks it. The badge does not track any in-flight state itself —
   * guard against repeated calls in the handler if needed.
   */
  onRemove?: () => void;
  /** Accessible label for the remove button. Defaults to "Remove". */
  removeAriaLabel?: string;
} & React.HTMLAttributes<HTMLSpanElement>;
export function TextBadge({
  text,
  variant = 'infoPrimary',
  className,
  customColor,
  onRemove,
  removeAriaLabel = 'Remove',
  ...rest
}: Props) {
  return (
    <StyledTextBadge
      className={['sc-text-badge', className].join(' ')}
      $variant={variant}
      $customColor={customColor}
      $removable={Boolean(onRemove)}
      {...rest}
    >
      {onRemove ? <span>{text}</span> : text}
      {onRemove && (
        <RemoveButton
          type="button"
          aria-label={removeAriaLabel}
          onClick={onRemove}
          className="sc-text-badge-remove"
        >
          <Icon name="Close" size="xs" />
        </RemoveButton>
      )}
    </StyledTextBadge>
  );
}
