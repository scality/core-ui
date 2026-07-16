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
  ShadowProps & { gap?: string | number; container?: boolean };

const Box = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'container' && shouldForwardProp(prop),
})<BoxComponentProps>`
  ${({ container }) =>
    container &&
    css`
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
