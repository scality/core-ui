import React from 'react';
import styled from 'styled-components';

import Box from '../src/lib/components/box/Box';

export default {
  title: 'Components/Box',
};

const HighlightBorder = styled.div`
  border: 1px solid red;
  div,
  span,
  p {
    border: 1px solid blue;
  }
`;

export const margin = () => {
  return (
    <HighlightBorder>
      <Box m={0}>Props m 0 = 0</Box>
      <Box m={1}>Props m 1 = 0.071rem </Box>
      <Box m={2}>Props m 2 = 0.143rem </Box>
      <Box m={3}>Props m 3 = 0.286rem </Box>
      <Box m={4}>Props m 4 = 0.571rem </Box>
      <Box m={5}>Props m 5 = 0.71rem</Box>
      <Box m={6}>Props m 6 = 0.857rem</Box>
      <Box m={7}>Props m 7 = 1rem</Box>
      <Box m={8}>Props m 8 = 1.143rem</Box>
      <Box m={9}>Props m 9 = 1.429rem</Box>
      <Box m={10}>Props m 10 = 1.714rem</Box>
      <Box m={11}>Props m 11 = 2rem</Box>
      <Box m={12}>Props m 12 = 2.286rem</Box>
      <Box m={13}>Props m 13 = 2.857rem</Box>
      <Box m={14}>Props m 13 = 14px</Box>
    </HighlightBorder>
  );
};

export const font = () => {
  return (
    <HighlightBorder>
      <Box fontSize="smaller">Smaller font</Box>
      <Box fontSize="small">Small font</Box>
      <Box fontSize="base">Base font</Box>
      <Box fontSize="large">large font</Box>
      <Box fontSize="larger">larger font</Box>
      <Box fontSize="huge">huge font</Box>
      <Box fontSize="massive">massive font</Box>
    </HighlightBorder>
  );
};

export const position = () => {
  return (
    <HighlightBorder>
      <Box display="flex" justifyContent="space-between" fontSize="smaller">
        <Box fontSize="base">Left</Box>
        <Box fontSize="base">Justify Content space between</Box>
        <Box fontSize="base">Right</Box>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        height="100px"
        fontSize="smaller"
      >
        <Box display="flex" height="50px" fontSize="base">
          Left
        </Box>
        <Box display="flex" height="50px" fontSize="base">
          Justify Content space between
        </Box>
        <Box display="flex" height="50px" fontSize="base">
          Right
        </Box>
      </Box>
      <Box display="flex" gap={6} height="100px" fontSize="smaller">
        <Box display="flex" height="50px" fontSize="base">
          Left
        </Box>
        <Box display="flex" height="50px" fontSize="base">
          Gap 6
        </Box>
        <Box display="flex" height="50px" fontSize="base">
          Right
        </Box>
      </Box>
    </HighlightBorder>
  );
};

export const colors = () => {
  return (
    <HighlightBorder>
      <Box color="red">red</Box>
      <Box bg="backgroundLevel2" color="textPrimary">
        textPrimary with background color at backgroundLevel2
      </Box>
      <Box color="textSecondary">textSecondary</Box>
      <Box color="textTertiary">textTertiary</Box>
      <Box color="textLink">textLink</Box>
    </HighlightBorder>
  );
};
