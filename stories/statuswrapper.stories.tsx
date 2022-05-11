import React from 'react';
import StatusWrapper from '../src/lib/components/statuswrapper/Statuswrapper.component';
import { Wrapper, Title } from './common';
import styled from 'styled-components';
import Icon from '../src/lib/components/icon/Icon.component';
import {
  BasicText,
  SecondaryText,
  LargerText,
  EmphaseText,
  StatusText,
  SmallerText,
  ChartTitleText,
} from '../src/lib/components/text/Text.component';
const PreviewWrapper = styled(Wrapper)`
  min-height: 0;
`;
export default {
  title: 'Components/StatusWrapper',
  component: StatusWrapper,
};
export const Default = () => {
  return (
    <Wrapper>
      <Title>Status Wrapper</Title>

      <PreviewWrapper>
        <BasicText>
          <StatusWrapper status="healthy">
            <Icon name={'Network'} color={'statusHealthy'} />
          </StatusWrapper>
          This is a text
        </BasicText>
      </PreviewWrapper>

      <PreviewWrapper>
        <SecondaryText>
          <StatusWrapper status="unknown">
            <Icon name={'Network'} color={'infoPrimary'} />
          </StatusWrapper>
          This is a text
        </SecondaryText>
      </PreviewWrapper>

      <PreviewWrapper>
        <LargerText>
          <StatusWrapper status="warning">
            <Icon name={'Network'} color={'statusWarning'} />
          </StatusWrapper>
          This is a text
        </LargerText>
      </PreviewWrapper>

      <PreviewWrapper>
        <EmphaseText>
          <StatusWrapper status="critical">
            <Icon name={'Network'} color={'statusCritical'} />
          </StatusWrapper>
          This is a text
        </EmphaseText>
      </PreviewWrapper>

      <PreviewWrapper>
        <StatusText>
          <StatusWrapper status="unknown">
            <Icon name={'Node-backend'} color={'infoPrimary'} />
          </StatusWrapper>
          This is a text
        </StatusText>
      </PreviewWrapper>

      <PreviewWrapper>
        <SmallerText>
          <StatusWrapper status="warning">
            <Icon name={'Volume-backend'} color={'statusWarning'} />
          </StatusWrapper>
          This is a text
        </SmallerText>
      </PreviewWrapper>

      <PreviewWrapper>
        <ChartTitleText>
          <StatusWrapper status="critical">
            <Icon name={'Toolbox'} color={'statusCritical'} />
          </StatusWrapper>
          This is a text
        </ChartTitleText>
      </PreviewWrapper>
    </Wrapper>
  );
};