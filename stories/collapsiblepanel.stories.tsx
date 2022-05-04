import React from 'react';
import { action } from '@storybook/addon-actions';
import { Title, Wrapper } from './common';
import CollapsiblePanel from '../src/lib/components/collapsiblepanel/CollapsiblePanel.component';
const items = [<i className="fas fa-carrot" />, 'banana', 'apple', 'grape'];
export default {
  title: 'Components/Navigation/CollapsiblePanel',
  component: CollapsiblePanel,
};
export const Default = () => {
  return (
    <Wrapper className="storybook-collapsiblepanel">
      <Title>Collapsed</Title>
      <CollapsiblePanel
        expanded={false}
        headerItems={items}
        onHeaderClick={action('Expand panel')}
        children="orange"
      />

      <Title>Expanded</Title>
      <CollapsiblePanel
        headerItems={items}
        expanded={true}
        onHeaderClick={action('Colapse panel')}
        children="orange"
      />
    </Wrapper>
  );
};