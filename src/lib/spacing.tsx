import { Children, HTMLAttributes, HTMLProps, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { Box, BoxComponentProps } from './components/box/Box';

export const spacing = {
  r1: '0.0625rem',
  r2: '0.125rem',
  r4: '0.25rem',
  r8: '0.5rem',
  r10: '0.625rem',
  r12: '0.75rem',
  r14: '0.875rem',
  r16: '1rem',
  r20: '1.25rem',
  r24: '1.5rem',
  r28: '1.75rem',
  r32: '2rem',
  r36: '2.25rem',
  r40: '2.5rem',
  f1: '1px',
  f2: '2px',
  f4: '4px',
  f8: '8px',
  f10: '10px',
  f12: '12px',
  f14: '14px',
  f16: '16px',
  f20: '20px',
  f24: '24px',
  f28: '28px',
  f32: '32px',
  f36: '36px',
  f40: '40px',
};

// The two separator treatments. A row Stack draws a full-height rule between
// its children; a column Stack draws a short dash. They are different shapes,
// not one shape on two axes, so a single element cannot serve both by CSS alone
// — which is why `stackBelow` below restyles the element rather than relying on
// the flip.
const ruleSeparator = css`
  width: 1px;
  align-self: stretch;
  flex-shrink: 0;
  margin: ${spacing.r12} 0;
`;

const dashSeparator = css`
  width: ${spacing.r24};
  height: 1px;
  align-self: auto;
  margin: 0;
`;

// One element for both directions. `Stack` used to pick between two components
// at render time, which meant a CSS direction change left the separators
// pointing the wrong way — CSS can restyle an element but cannot swap which one
// React rendered.
const Separator = styled.div<{
  $direction: 'vertical' | 'horizontal';
  $stackBelow?: number;
}>`
  background: ${(props) => props.theme.border};
  ${(props) =>
    props.$direction === 'horizontal' ? ruleSeparator : dashSeparator}

  ${(props) =>
    props.$direction === 'horizontal' &&
    props.$stackBelow !== undefined &&
    css`
      @container responsive (max-width: ${props.$stackBelow}px) {
        ${dashSeparator}
      }
    `}
`;

// Layout lives here rather than on `Box`'s props so the container query below
// isn't fighting styled-system output for specificity.
const StackBox = styled(Box)<{
  $direction: 'vertical' | 'horizontal';
  $stackBelow?: number;
}>`
  display: flex;
  flex-direction: ${(props) =>
    props.$direction === 'horizontal' ? 'row' : 'column'};
  align-items: ${(props) =>
    props.$direction === 'horizontal' ? 'center' : 'normal'};

  ${(props) =>
    props.$direction === 'horizontal' &&
    props.$stackBelow !== undefined &&
    css`
      @container responsive (max-width: ${props.$stackBelow}px) {
        flex-direction: column;
        align-items: normal;
      }
    `}
`;

export const Stack = ({
  gap,
  direction,
  withSeparators,
  stackBelow,
  children,
  ...rest
}: {
  gap?: keyof typeof spacing;
  direction?: 'vertical' | 'horizontal';
  withSeparators?: boolean;
  /**
   * Below this container width (px) a horizontal Stack becomes vertical, and
   * its separators become the vertical treatment along with it. Requires an
   * ancestor that establishes the `responsive` container — `<Box container>`.
   * Without one the query never matches and the Stack stays horizontal.
   * Ignored when `direction="vertical"`.
   */
  stackBelow?: number;
  children: ReactNode[];
  container?: boolean;
} & HTMLAttributes<HTMLDivElement>) => {
  gap = gap || 'r8';
  direction = direction || 'horizontal';

  const numberOfChildren = Children.count(children);

  return (
    <StackBox
      $direction={direction}
      $stackBelow={stackBelow}
      gap={spacing[gap]}
      {...rest}
    >
      {Children.map(children, (node, nodeIndex) => {
        return (
          <>
            {node}
            {withSeparators && nodeIndex + 1 !== numberOfChildren && (
              <Separator $direction={direction} $stackBelow={stackBelow} />
            )}
          </>
        );
      })}
    </StackBox>
  );
};

export const Wrap = ({
  children,
  ...rest
}: { children: ReactNode[] } & Omit<HTMLProps<HTMLDivElement>, 'ref' | 'as'> &
  BoxComponentProps) => {
  return (
    <Box display={'flex'} justifyContent="space-between" {...rest}>
      {Children.map(children, (node) => {
        return <>{node}</>;
      })}
    </Box>
  );
};
