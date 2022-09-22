import React from 'react';
import {
  BasicText,
  SecondaryText,
  LargerText,
  EmphaseText,
  StatusText,
  SmallerText,
  ChartTitleText,
  Text,
  Link,
} from '../src/lib/components/text/Text.component';
import { Wrapper } from './common';
import styled from 'styled-components';
import { Stack } from '../src/lib';
const TextWrapper = styled(Wrapper)`
  min-height: 0;
`;
export default {
  title: 'Components/Text',
  component: StatusText,
  argTypes: {
    status: {
      control: {
        disable: true,
      },
    },
    children: {
      control: {
        disable: true,
      },
    },
  },
}; 

export const basicText = ({}: any) => {
  return (
    <TextWrapper>
      <BasicText>basic text</BasicText>
    </TextWrapper>
  );
};

export const secondaryText = ({}: any) => {
  return (
    <TextWrapper>
      <SecondaryText>secondary text</SecondaryText>
    </TextWrapper>
  );
};

export const largerText = ({}: any) => {
  return (
    <TextWrapper>
      <LargerText>larger text</LargerText>
    </TextWrapper>
  );
};

export const emphaseText = ({}: any) => {
  return (
    <TextWrapper>
      <EmphaseText>emphase text</EmphaseText>
    </TextWrapper>
  );
};

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

export const smallerText = ({}: any) => {
  return (
    <TextWrapper>
      <SmallerText>smaller text</SmallerText>
    </TextWrapper>
  );
};

export const chartTitleText = ({}: any) => {
  return (
    <TextWrapper>
      <ChartTitleText>chart title text</ChartTitleText>
    </TextWrapper>
  );
};

export const TextStory = ({}) => {
  return (
    <TextWrapper>
      <Stack direction="vertical">
        <Text>Basic</Text>
        <Text variant="Basic">Explicitely basic</Text>
        <Text variant="ChartTitle">Chart title</Text>
        <Text variant="Larger">Larger</Text>
        <Text variant="Smaller">Smaller</Text>
        <Text variant="Basic" color="textSecondary">
          With secondary color
        </Text>
        <Text variant="Basic" color="textSecondary" isEmphazed>
          With secondary color and emphazed
        </Text>
        <Text variant="Smaller" color="statusCritical">
          With status color
        </Text>
        <Link href='#'>Link</Link>
      </Stack>
    </TextWrapper>
  );
};
