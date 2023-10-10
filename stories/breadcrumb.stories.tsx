import React from 'react';
import { Breadcrumb } from '../src/lib/components/breadcrumb/Breadcrumb.component';
import { Wrapper, Title } from './common';
export default {
  title: 'Components/Navigation/Breadcrumb',
  component: Breadcrumb,
  decorators:[(story) => (
    <Wrapper style={{minHeigth:'10vh'}}>
        {story()}
    </Wrapper>)],
    argTypes: {
      paths:{
        control:false,
      }
    }
};
export const Default = {
  args:{
    paths:[
      <a href="home">home</a>,
      <a href="cluster">cluster_1</a>,
      <a
        href="node"
        title={'node'}
      >
        node
      </a>,
      <label>volumes</label>,
    ]
  }
}
export const longNameBreadCrumb = {
  args:{
    paths:[
      <a href="home">home</a>,
      <a href="cluster">cluster_1</a>,
      <a
        href="node"
        title={'node_longlonglonglonglonglonglonglonglonglonglong'}
      >
        node_longlonglonglonglonglonglonglonglonglonglong
      </a>,
      <label>volumes</label>,
    ]
  }
};
