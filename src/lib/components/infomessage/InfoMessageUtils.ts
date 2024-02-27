import { DefaultTheme, useTheme } from 'styled-components';
import { hex2RGB } from '../../utils';
import { useEffect, useRef, useState } from 'react';

export const useComputeBackgroundColor = () => {
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [backgroundColor, setBackgroundColor] = useState('');

  useEffect(() => {
    containerRef.current &&
      setBackgroundColor(getBackgroundColor(containerRef.current, theme));
    console.log('containerRef.current', containerRef.current);
  }, [containerRef, theme]);

  return {
    containerRef,
    backgroundColor,
  };
};

export const getBackgroundColor = (
  element: HTMLElement,
  theme: DefaultTheme,
) => {
  if (element.parentElement) {
    const parentElementBackgroundColor = window.getComputedStyle(
      element.parentElement,
    )['background-color'];
    if (
      /rgba\([0-9]+, [0-9]+, [0-9]+, 0\)/.test(parentElementBackgroundColor) ||
      !window.getComputedStyle(element.parentElement)['background-color']
    ) {
      return getBackgroundColor(element.parentElement, theme);
    } else {
      const rgbArray = hex2RGB(theme.backgroundLevel2);
      if (
        `rgb(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]})` ===
        parentElementBackgroundColor
      ) {
        return theme.backgroundLevel3;
      }
    }
  }
  return theme.backgroundLevel2;
};
