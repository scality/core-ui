import styled, { css } from 'styled-components';
import shouldForwardProp from '@styled-system/should-forward-prop';
import {
  layout,
  flexbox,
  grid,
  space,
  position,
  color,
  background,
  border,
  typography,
  shadow,
  system,
} from 'styled-system';
import type {
  LayoutProps,
  FlexboxProps,
  ColorProps,
  SpaceProps,
  PositionProps,
  GridProps,
  BackgroundProps,
  BordersProps,
  TypographyProps,
  ShadowProps,
} from 'styled-system';

export type BoxComponentProps = LayoutProps &
  FlexboxProps &
  GridProps &
  SpaceProps &
  PositionProps &
  ColorProps &
  BackgroundProps &
  BordersProps &
  TypographyProps &
  ShadowProps & {
    gap?: string | number;
    /**
     * Declare this Box the `responsive` container, so `@container responsive`
     * queries inside it — `Button iconOnly={number}`, a `Form responsive`
     * section's row/stack flip — resolve against its width instead of looking
     * further up the tree. Containment takes the contents out of the intrinsic
     * width, so the Box needs a definite width from its parent; see the
     * "Responsive" guideline.
     */
    container?: boolean;
  };

const Box = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'container' && shouldForwardProp(prop),
})<BoxComponentProps>`
  ${({ container }) =>
    container &&
    css`
      /* Containment takes the contents out of the intrinsic width, so a container
         Box needs a definite width from its parent — a flex grow factor, a grid
         track or block layout. min-width keeps it from being pinned to the content
         width it no longer has; the Box itself stays unopinionated about where the
         definite width comes from. */
      min-width: 0;
      container-type: inline-size;
      container-name: responsive;
    `}
  ${layout}
  ${flexbox}
  ${grid}
  ${space}
  ${position}
  ${color}
  ${background}
  ${border}
  ${typography}
  ${shadow}
  ${system({
    gap: {
      property: 'gap',
      scale: 'space',
    },
  })}
`;
export { Box };
