import React from 'react';
import styled from 'styled-components';
import { zIndex } from '../../style/theme';
import { spacing } from '../../spacing';
import { getThemePropSelector } from '../../utils';
import { Icon } from '../icon/Icon.component';

const StyledScrollButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${spacing.r24};
  z-index: ${zIndex.scrollbarButton};
  color: ${getThemePropSelector('textSecondary')};
  background-color: ${getThemePropSelector('backgroundLevel3')};
  box-shadow: 0px 0px ${spacing.r2} rgba(0, 0, 0, 0.75);
  box-sizing: border-box;
  border: ${spacing.r1} solid transparent;
  cursor: pointer;

  &:hover {
    border-radius: ${spacing.r2};
    box-shadow: none;
    border: ${spacing.r1} solid ${getThemePropSelector('infoPrimary')};
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
      <Icon name={`Chevron-${direction}`} />
    </StyledScrollButton>
  );
});
export { ScrollButton };
