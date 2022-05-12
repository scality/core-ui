import React from 'react';
import styled from 'styled-components';
import { SpacedBox } from '../src/lib/components/spacedbox/SpacedBox';
import { Props } from '../src/lib/components/spacedbox/SpacedBox';
const control = {
  control: {
    type: 'select',
    options: [0, 1, 2, 4, 8, 12, 14, 16, 20, 24, 28, 32],
  },
};
export default {
  title: 'Components/SpacedBox',
  argTypes: {
    m: control,
    mt: control,
    mr: control,
    mb: control,
    ml: control,
    mx: control,
    my: control,
    p: control,
    pt: control,
    pr: control,
    pb: control,
    pl: control,
    px: control,
    py: control,
  },
};
const HighlightBorder = styled.div`
  border: 1px solid red;
  div,
  span,
  p {
    border: 1px solid blue;
  }
`;
const GreenSpan = styled.span`
  background-color: #0aada6;
`;
const BoldP = styled.p`
  font-weight: 700;
`;

const DisplayTextComp = ({ text, ...rest }) => {
  return (
    <BoldP {...rest}>
      <GreenSpan>{text}</GreenSpan>
    </BoldP>
  );
};

export const margin = () => {
  return (
    <HighlightBorder>
      <SpacedBox m={0}>Props m 0</SpacedBox>
      <SpacedBox m={1}>Props m 1</SpacedBox>
      <SpacedBox m={2}>Props m 2</SpacedBox>
      <SpacedBox m={4}>Props m 4 </SpacedBox>
      <SpacedBox m={8}>Props m 8</SpacedBox>
      <SpacedBox m={12}>Props m 12</SpacedBox>
      <SpacedBox m={14}>Props m 14</SpacedBox>
      <SpacedBox m={16}>Props m 16</SpacedBox>
      <SpacedBox m={20}>Props m 20</SpacedBox>
      <SpacedBox m={28}>Props m 28</SpacedBox>
      <SpacedBox m={32}>Props m 32</SpacedBox>
    </HighlightBorder>
  );
};
export const padding = () => {
  return (
    <HighlightBorder>
      <SpacedBox p={0}>Props p 0</SpacedBox>
      <SpacedBox p={1}>Props p 1</SpacedBox>
      <SpacedBox p={2}>Props p 2</SpacedBox>
      <SpacedBox p={4}>Props p 4 </SpacedBox>
      <SpacedBox p={8}>Props p 8</SpacedBox>
      <SpacedBox p={12}>Props p 12</SpacedBox>
      <SpacedBox p={14}>Props p 14</SpacedBox>
      <SpacedBox p={16}>Props p 16</SpacedBox>
      <SpacedBox p={20}>Props p 20</SpacedBox>
      <SpacedBox p={28}>Props p 28</SpacedBox>
      <SpacedBox p={32}>Props p 32</SpacedBox>
    </HighlightBorder>
  );
};
export const mix = () => {
  return (
    <HighlightBorder>
      <SpacedBox pl={8} pt={12} mt={12}>
        Props pl 8, pt 12, mt 12
      </SpacedBox>
      <SpacedBox mx={24} py={32}>
        Props mx 24, py 32
      </SpacedBox>
      <SpacedBox ml={1} mt={2} mr={4} mb={8} pl={12} pt={14} pr={16} pb={24}>
        Props ml 1, mt 2, mr 4, mb 8, pl 12, pt 14, pr 16, pb 24
      </SpacedBox>
    </HighlightBorder>
  );
};
export const composition = () => {
  return (
    <HighlightBorder>
      <SpacedBox as={GreenSpan} ml={16}>
        Composition Example: Green background {'"</span>"'} with margin left
      </SpacedBox>
      <SpacedBox as={BoldP} my={14} p={14}>
        Bold {'"</p>"'} with my 14 and p 14
      </SpacedBox>
      <SpacedBox
        as={DisplayTextComp}
        text={'SpacedBox + React component + nested styled component'}
        m={12}
        p={14}
      ></SpacedBox>
    </HighlightBorder>
  );
};

const Template = (args: Props) => (
  <HighlightBorder>
    <SpacedBox {...args}>Playground</SpacedBox>
  </HighlightBorder>
);

export const Playground = Template.bind({});
