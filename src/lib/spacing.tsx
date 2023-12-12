import { Children, HTMLAttributes, HTMLProps, ReactNode } from 'react';
import styled from 'styled-components';
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

const HSeparator = styled.div`
  min-height: ${spacing.r40};
  min-width: ${spacing.r2};
  background: ${(props) => props.theme.backgroundLevel1};
`;

const VSeparator = styled.div`
  height: 1px;
  width: ${spacing.r24};
  background: ${(props) => props.theme.border};
`;

const Separator = ({ type }: { type?: 'vertical' | 'horizontal' }) => {
  return (
    <>
      {type === 'horizontal' && <HSeparator>&nbsp;</HSeparator>}
      {type === 'vertical' && <VSeparator>&nbsp;</VSeparator>}
    </>
  );
};

export const Stack = ({
  gap,
  direction,
  withSeparators,
  children,
  ...rest
}: {
  gap?: keyof typeof spacing;
  direction?: 'vertical' | 'horizontal';
  withSeparators?: boolean;
  children: ReactNode[];
} & HTMLAttributes<HTMLDivElement>) => {
  gap = gap || 'r8';
  direction = direction || 'horizontal';

  const numberOfChildren = Children.count(children);

  return (
    <Box
      display={'flex'}
      flexDirection={direction === 'horizontal' ? 'row' : 'column'}
      alignItems={direction === 'horizontal' ? 'center' : 'normal'}
      gap={spacing[gap]}
      {...rest}
    >
      {Children.map(children, (node, nodeIndex) => {
        return (
          <>
            {node}
            {withSeparators && nodeIndex + 1 !== numberOfChildren && (
              <Separator type={direction} />
            )}
          </>
        );
      })}
    </Box>
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
