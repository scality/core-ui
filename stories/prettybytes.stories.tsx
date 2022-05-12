import React from 'react';
import { PrettyBytes } from '../src/lib/components/prettybytes/PrettyBytes.component';
import { Wrapper, Title } from './common';
import { getThemePropSelector } from '../src/lib/utils';
import styled from 'styled-components';
export default {
  title: 'Components/PrettyBytes',
  component: PrettyBytes,
};
const BytesWrapper = styled.div`
  color: ${getThemePropSelector('textPrimary')};
  display: flex;
  div {
    margin-right: 20px;
  }
`;

const generatePrettyBytes = (decimals) =>
  [1024, 12783, 99, 1000].map((bytes, index) => (
    <div key={index}>
      <div>
        {bytes}
        <br />
        ---
      </div>
      {Array.from(new Array(9)).map((_, index) => (
        <div key={index}>
          <PrettyBytes decimals={decimals} bytes={Math.pow(bytes, index + 1)} />
        </div>
      ))}
    </div>
  ));

export const Default = () => (
  <Wrapper>
    <Title>Pretty Bytes</Title>
    <BytesWrapper>{generatePrettyBytes(0)}</BytesWrapper>
    <Title>Pretty Bytes with decimals</Title>
    <BytesWrapper>{generatePrettyBytes(2)}</BytesWrapper>
  </Wrapper>
);
