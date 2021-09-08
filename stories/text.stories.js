//@flow
import React from 'react';
import {
  BasicText,
  SecondaryText,
  LargerText,
  EmphaseText,
  StatusText,
  SmallerText,
  ChartTitleText,
} from '../src/lib/components/text/Text.component';
import { Wrapper } from './common';
import styled from 'styled-components';

const TextWrapper = styled(Wrapper)`
  min-height: 0;
`;

export default {
  title: 'Components/Text',
  component: StatusText,
};

// eslint-disable-next-line
export const basicText = ({}: any) => {
  return (
    <TextWrapper>
      <BasicText>basic text</BasicText>
    </TextWrapper>
  );
};

// eslint-disable-next-line
export const secondaryText = ({}: any) => {
  return (
    <TextWrapper>
      <SecondaryText>secondary text</SecondaryText>
    </TextWrapper>
  );
};

// eslint-disable-next-line
export const largerText = ({}: any) => {
  return (
    <TextWrapper>
      <LargerText>larger text</LargerText>
    </TextWrapper>
  );
};

// eslint-disable-next-line
export const emphaseText = ({}: any) => {
  return (
    <TextWrapper>
      <EmphaseText>emphase text</EmphaseText>
    </TextWrapper>
  );
};

// eslint-disable-next-line
export const statusText = ({}: any) => {
  return (
    <TextWrapper>
      <div>
        <StatusText status="healthy">healthy status text</StatusText>
      </div>
      <div>
        <StatusText status="warning">warning status text</StatusText>
      </div>
      <div>
        <StatusText status="critical">critical status text</StatusText>
      </div>
    </TextWrapper>
  );
};

// eslint-disable-next-line
export const smallerText = ({}: any) => {
  return (
    <TextWrapper>
      <SmallerText>smaller text</SmallerText>
    </TextWrapper>
  );
};

// eslint-disable-next-line
export const chartTitleText = ({}: any) => {
  return (
    <TextWrapper>
      <ChartTitleText>chart title text</ChartTitleText>
    </TextWrapper>
  );
};
