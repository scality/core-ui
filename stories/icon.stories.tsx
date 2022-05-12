import React from 'react';
import { Icon, iconTable } from '../src/lib/components/icon/Icon.component';
import { Wrapper, Title } from './common';
export default {
  title: 'Components/Icon',
  component: Icon,
};
export const Default = () => {
  return (
    <Wrapper>
      <Title>Customized Icons</Title>
      <Icon name={'Theme'} size={'xs'} />
      <Icon name={'Account'} size={'sm'} color={'alert'} />
      <Icon name={'Backend'} size={'lg'} color={'base'} />
      <Icon name={'Tape'} size={'1x'} color={'alert'} />
      <Icon name={'Node-backend'} size={'2x'} color={'primary'} />
      <Icon name={'Volume-backend'} size={'4x'} color={'primaryDark1'} />
      <Icon name={'Node-pdf'} size={'6x'} color={'primaryDark2'} />
      <Icon name={'Volume-pdf'} size={'8x'} color={'secondary'} />
      <Icon name={'Network'} size={'9x'} color={'secondaryDark1'} />
      <Icon name={'Bucket'} size={'10x'} color={'secondaryDark2'} />
      <Icon name={'Dot-circle'} color={'infoPrimary'} />
      <Icon name={'Check-circle'} color={'statusHealthy'} />
      <Icon name={'Exclamation-circle'} color={'statusWarning'} />
      <Icon name={'Times-circle'} color={'statusCritical'} />
      <Title>All Icons</Title>
      {Object.keys(iconTable).map((key, index) => (
        <Icon key={index} name={key} size={'2x'} color={'secondary'} />
      ))}
    </Wrapper>
  );
};
