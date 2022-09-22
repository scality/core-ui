import React from 'react';
import { Icon, iconTable } from '../src/lib/components/icon/Icon.component';
import { Wrapper, Title } from './common';
export default {
  title: 'Components/Icon',
  component: Icon,
};
export const Default = ({}) => {
  return (
    <Wrapper>
      <Title>Customized Icons</Title>
      <Icon name={'Theme'} size={'xs'} />
      <Icon name={'Account'} size={'sm'} color={'statusWarning'} />
      <Icon name={'Backend'} size={'lg'} color={'infoPrimary'} />
      <Icon name={'Tape'} size={'1x'} color={'statusWarning'} />
      <Icon name={'Node-backend'} size={'2x'} color={'backgroundLevel1'} />
      <Icon name={'Volume-backend'} size={'4x'} color={'backgroundLevel4'} />
      <Icon name={'Node-pdf'} size={'6x'} color={'backgroundLevel1'} />
      <Icon name={'Volume-pdf'} size={'8x'} color={'selectedActive'} />
      <Icon name={'Network'} size={'9x'} color={'secondaryDark1'} />
      <Icon name={'Bucket'} size={'10x'} color={'secondaryDark2'} />
      <Icon name={'Dot-circle'} color={'infoPrimary'} />
      <Icon name={'Check-circle'} color={'statusHealthy'} />
      <Icon name={'Exclamation-circle'} color={'statusWarning'} />
      <Icon name={'Times-circle'} color={'statusCritical'} />
      <Title>All Icons</Title>
      {Object.keys(iconTable).map((key, index) => (
        <Icon key={index} name={key} size={'2x'} color={'selectedActive'} />
      ))}
    </Wrapper>
  );
};
