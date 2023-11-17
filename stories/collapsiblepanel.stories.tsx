import React from 'react';
import { action } from '@storybook/addon-actions';
import { Wrapper } from './common';
import { CollapsiblePanel } from '../src/lib/components/collapsiblepanel/CollapsiblePanel.component';
const items = [<i className="fas fa-carrot" />, 'banana', 'apple', 'grape'];
export default {
  title: 'Components/Deprecated/Navigation/CollapsiblePanel',
  component: CollapsiblePanel,
  decorators: [
    (story) => (
      <Wrapper style={{ minHeight: '30vh', padding: '3rem' }}>
        {story()}
      </Wrapper>
    ),
  ],
  args: {
    headerItems: items,
    children: 'orange',
  },
};

export const Collapsed = {
  args: {
    expanded: false,
    onHeaderClick: action('Expand panel'),
  },
};

export const Expanded = {
  args: {
    expanded: true,
    onHeaderClick: action('Collapse panel'),
  },
};
// export const Default = {
//   render: ({}) => {
//     return (
//       <Wrapper className="storybook-collapsiblepanel">
//         <Title>Collapsed</Title>
//         <CollapsiblePanel
//           expanded={false}
//           headerItems={items}
//           onHeaderClick={action('Expand panel')}
//           children="orange"
//         />

//         <Title>Expanded</Title>
//         <CollapsiblePanel
//           headerItems={items}
//           expanded={true}
//           onHeaderClick={action('Colapse panel')}
//           children="orange"
//         />
//       </Wrapper>
//     );
//   },
// };
