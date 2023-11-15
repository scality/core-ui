import React from 'react';
import InfoMessage from '../src/lib/components/infomessage/InfoMessage.component';
import { Wrapper, Title } from './common';
import { defaultTheme } from '../src/lib/style/theme';

export default {
  title: 'Components/InfoMessage',
  component: InfoMessage,
};

export const Default = () => {
  return (
    <Wrapper>
      <Title>Basic usage</Title>
      <div
        style={{
          backgroundColor: defaultTheme.darkRebrand.backgroundLevel2,
          padding: '1rem',
        }}
      >
        <div
          style={{
            padding: '1rem',
          }}
        >
          <InfoMessage
            title="What to do with this key?"
            content="This key is needed by the Veeam repository to access ARTESCA for data backup."
            link="test"
          />
        </div>
      </div>
    </Wrapper>
  );
};
