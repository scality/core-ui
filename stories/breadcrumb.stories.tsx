import React from 'react';
import Breadcrumb from '../src/lib/components/breadcrumb/Breadcrumb.component';
import { Wrapper, Title } from './common';
export default {
  title: 'Components/Navigation/Breadcrumb',
  component: Breadcrumb,
};
export const Default = () => {
  return (
    <Wrapper>
      <Title>Default Breadcrumb </Title>
      <Breadcrumb
        paths={[
          <a href="home">home</a>,
          <a href="cluster">cluster_1</a>,
          <a
            href="node"
            title={'node_longlonglonglonglonglonglonglonglonglonglong'}
          >
            node_longlonglonglonglonglonglonglonglonglonglong
          </a>,
          <label>volumes</label>,
        ]}
      />
    </Wrapper>
  );
};