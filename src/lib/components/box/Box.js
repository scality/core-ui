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

const Box = styled.div`
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

export default Box;
