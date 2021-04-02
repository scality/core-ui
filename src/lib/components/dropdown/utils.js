import { css } from 'styled-components';

const getBorderCollisionDetection = (isItem, triggerSize, size) => {
  let isTopHit = false
  let isRightHit = false
  let isBottomHit = false
  let isLeftHit = false

  if (size && triggerSize && triggerSize.top - size.height <= 0) {
    isTopHit = true
  }
  if (size && triggerSize && triggerSize.right + triggerSize.width > window.innerWidth) {
    isRightHit = true
  }
  if (size && triggerSize && triggerSize.top + size.height >= window.innerHeight) {
    isBottomHit = true
  }
  if (size && triggerSize && triggerSize.left - triggerSize.width <= 0) {
    isLeftHit = true
  }

  return {
    isTopHit,
    isRightHit,
    isBottomHit,
    isLeftHit
  }
}

export const getPositionDropdownMenu = ({ isItem, triggerSize, size, nbItems, itemIndex }) => {
  const { isTopHit, isRightHit, isBottomHit, isLeftHit } = getBorderCollisionDetection(isItem, triggerSize, size)

  if (isItem) {
    // Check collision for dropdown acting as an item
    if (isRightHit && isBottomHit) {
      return css`
          right: ${size.width}px;
          bottom: ${-triggerSize.height * (itemIndex - nbItems + 1)}px;
        `;
    } else if (isLeftHit && isBottomHit || isBottomHit) {
      return css`
          left: ${size.width}px;
          bottom: ${-triggerSize.height * (itemIndex - nbItems + 1)}px;
        `;
    } else if (isTopHit && isRightHit || isRightHit) {
      return css`
          right: ${size.width}px;
          top: ${triggerSize.height * itemIndex}px;
        `;
    }
    else {
      return css`
          left: ${triggerSize.width}px;
          top: ${triggerSize.height * itemIndex}px;
        `;
    }
  }
  else {
    // Check collision for dropdown acting as a root button*
  if (isBottomHit) {
      return css`
          left: 0;
          bottom: ${triggerSize.height}px;
        `;
    } else {
    return css`
          left: 0;
          top: 100%;
        `;
    }
  }
}
