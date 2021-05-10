//@flow
import React from 'react';
import {
  BasicText,
  SecondaryText,
  LargerText,
  EmphaseText,
  StatusText,
  SmallerText,
} from '../src/lib/components/text/Text.component';

export default {
  title: 'Components/Text',
};

export const basicText = () => {
  return <BasicText>basic text</BasicText>;
};

export const secondaryText = () => {
  return <SecondaryText>secondary text</SecondaryText>;
};

export const largerText = () => {
  return <LargerText>larger text</LargerText>;
};

export const emphaseText = () => {
  return <EmphaseText>emphase text</EmphaseText>;
};

export const statusText = () => {
  return (
    <>
      <div>
        <StatusText status="healthy">healthy status text</StatusText>
      </div>
      <div>
        <StatusText status="warning">warning status text</StatusText>
      </div>
      <div>
        <StatusText status="critical">critical status text</StatusText>
      </div>
      <div>
        <StatusText status="unknown">unknown status text</StatusText>
      </div>
    </>
  );
};

export const smallerText = () => {
  return (
    <div style={{ width: '100px' }}>
      <SmallerText>smaller text</SmallerText>
    </div>
  );
};
