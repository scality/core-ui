import { DefaultTheme, useTheme } from "styled-components";
import { defaultTheme } from "../../style/theme";
import { hex2RGB } from "../../utils";
import { useEffect, useRef, useState } from "react";

export const useComputeBackgroundColor = () => {
    const theme = useTheme();
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [backgroundColor, setBackgroundColor] = useState('');
  
    useEffect(() => {
      containerRef.current &&
        setBackgroundColor(getBackgroundColor(containerRef.current, theme));
    }, [containerRef]);
  
    return {
      containerRef,
      backgroundColor,
    };
  };

export const getBackgroundColor = (element: HTMLElement, theme: DefaultTheme) => {
    if (element.parentElement) {
      const parentElementBackgroundColor = window.getComputedStyle(
        element.parentElement,
      )['background-color'];
      if (/rgba/.test(parentElementBackgroundColor) || !window.getComputedStyle(element.parentElement,)['background-color']) {
        // need to test if opacity = 0
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