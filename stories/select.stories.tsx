import React from 'react';
import { Select } from '../src/lib/components/select/Select.component';
import { Wrapper, Title } from './common';
const options = Array.from(new Array(1000), (_, index) => ({
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
};
export const Default = () => {
  return (
    <Wrapper>
      <Title>Default</Title>
      <div
        style={{
          width: '200px',
        }}
      >
        <Select
          name="default_select"
          options={options}
          onChange={(e) => console.log(e)}
          placeholder="Select an item..."
          noOptionsMessage={() => 'Not found'}
          value=""
        />
      </div>
      <Title>Default with custom formatOptionLabel</Title>
      <div
        style={{
          width: '200px',
        }}
      >
        <Select
          name="default_select"
          options={options}
          onChange={(e) => console.log(e)}
          placeholder="Select an item..."
          noOptionsMessage={() => 'Not found'}
          value={options[0]}
          formatOptionLabel={customFormatOptionLabel}
        />
      </div>
      <Title>Multi Select</Title>
      <div
        style={{
          width: '400px',
        }}
      >
        <Select
          name="multi_select"
          options={options}
          onChange={(e) => console.log(e)}
          placeholder="Select an item..."
          noOptionsMessage={() => 'Not found'}
          isMulti={true}
          value={[options[0], options[1]]}
        />
      </div>
    </Wrapper>
  );
};
