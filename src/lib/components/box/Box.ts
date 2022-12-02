import styled from 'styled-components';
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
  ShadowProps & { gap?: string | number };

const Box = styled.div<BoxComponentProps>`
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
