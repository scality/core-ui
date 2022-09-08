import React from 'react';
import styled, { css } from 'styled-components';

import { getTheme } from '../../utils';
type Props = {
  children: React.ReactNode;
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
          background: ${brand.backgroundLevel3};
        }

        ::-webkit-scrollbar-thumb {
          width: 4px;
          height: 4px;
          min-height: 20px;
          background: ${brand.buttonSecondary};
          border-radius: 4px;
          -webkit-border-radius: 4px;
          background-clip: padding-box;
          border: 2px solid rgba(0, 0, 0, 0);
        }

        ::-webkit-scrollbar-thumb:vertical:hover,
        ::-webkit-scrollbar-thumb:horizontal:hover {
          background-color: rgba(89, 90, 120, 0.5);
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
        scrollbar-color: ${brand.buttonSecondary} ${brand.backgroundLevel3};
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
