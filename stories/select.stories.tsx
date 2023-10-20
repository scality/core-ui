import React from 'react';
import { Select } from '../src/lib/components/select/Select.component';
import { Wrapper, Title } from './common';
const options = Array.from(new Array(100), (_, index) => ({
  label: `Item ${index}`,
  value: index,
  title: `Item ${index}`,
  'data-cy': `Item_${index}`,
}));

const customFormatOptionLabel = ({ value, label, ...rest }) => (
  <div className="sc-select-option-custom-label" {...rest}>
    {label} {value % 2 === 0 ? <i className="fas fa-flag-usa"></i> : null}
  </div>
);

export default {
  title: 'Components/Selector/Select',
  component: Select,
  decorators:[story => <Wrapper>{story()}</Wrapper>],
  argTypes:{
    options:{
      description:"Array of objects with label, title and value properties",
      control:false
    },
    isMulti:{
      control:{
        type:'boolean'
      }
    }
  }
};

export const Playground = {
  args:{
    options,
  }
}

export const WithCustomLabel = {
  args:{
    options,
    formatOptionLabel: customFormatOptionLabel
  }
}

export const MultiSelect = {
  args:{
    options,
    isMulti:true,
    value:[options[0], options[1]],
  }
}