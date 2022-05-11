import React from 'react';
import styled from 'styled-components';
import * as defaultTheme from '../../style/theme';
import { getThemePropSelector } from '../../utils';

const StyledScrollButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${defaultTheme.spacing.sp24};
  z-index: ${defaultTheme.zIndex.scrollbarButton};
  color: ${getThemePropSelector('textSecondary')};
  background-color: ${getThemePropSelector('backgroundLevel3')};
  box-shadow: 0px 0px ${defaultTheme.spacing.sp2} rgba(0, 0, 0, 0.75);
  box-sizing: border-box;
  border: ${defaultTheme.spacing.sp1} solid transparent;
  cursor: pointer;

  &:hover {
    border-radius: ${defaultTheme.spacing.sp2};
    box-shadow: none;
    border: ${defaultTheme.spacing.sp1} solid
      ${getThemePropSelector('infoPrimary')};
  }
`;
type Props = {
  direction: 'left' | 'right';
  onClick: (arg0: React.SyntheticEvent<HTMLDivElement>) => void;
};
const ScrollButton = React.forwardRef(({ direction, onClick }: Props, ref) => {
  return (
    // @ts-ignore
    <StyledScrollButton direction={direction} onClick={onClick} ref={ref}>
      <i className={`fas fa-chevron-${direction}`} />
    </StyledScrollButton>
  );
});
export default ScrollButton;
