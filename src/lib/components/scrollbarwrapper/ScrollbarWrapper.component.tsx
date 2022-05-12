import React from 'react';
import styled, { css } from 'styled-components';

import { getTheme } from '../../utils';
type Props = {
  children: JSX.Element;
};
const ScrollbarContainer = styled.div`
  ${(props) => {
    const brand = getTheme(props);
    return css`
      // Custom scrollbar
      * {
        // Chrome / Safari / Edge
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: ${brand.primary};
        }

        ::-webkit-scrollbar-thumb {
          width: 4px;
          height: 4px;
          min-height: 20px;
          background: ${brand.border};
          border-radius: 4px;
          -webkit-border-radius: 4px;
          background-clip: padding-box;
          border: 2px solid rgba(0, 0, 0, 0);
        }

        ::-webkit-scrollbar-button {
          width: 0;
          height: 0;
          display: none;
        }
        ::-webkit-scrollbar-corner {
          background-color: transparent;
        }

        // Firefox
        scrollbar-color: ${brand.border} ${brand.primary};
        scrollbar-width: thin;
      }
    `;
  }}
`;

function ScrollbarWrapper({ children }: Props) {
  return (
    <ScrollbarContainer className="sc-scrollbar">{children}</ScrollbarContainer>
  );
}

export { ScrollbarWrapper };
