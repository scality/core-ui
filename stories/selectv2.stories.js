import Select, {
  Option,
} from '../src/lib/components/selectv2/Selectv2.component';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Wrapper, Title } from './common';
import Icon from '../src/lib/components/icon/Icon.component';

export default {
  title: 'Components/v2/Select',
  component: Select,
};

const SelectWrapper = styled.div`
  max-width: 300px;
  min-height: 100vh;
  flex-direction: column;
  display: flex;
`;

const generateOptions = (n = 10) =>
  Array.from(new Array(n), (_, index) => ({
    label: `Item ${index}`,
    value: index.toString(),
    disabled: index !== 0 && index % 8 === 0,
    icon: index % 5 === 0 ? <Icon name={'Check'} /> : null,
  }));

const optionsWithSearchBar = generateOptions(25);
const optionsWithoutSearchBar = generateOptions(7);
const defaultOptions = generateOptions(4);

const CustomSelect = (props) => {
  const [value, setValue] = useState(null);

  return (
    <Select value={value} onChange={(value) => setValue(value)} {...props}>
      {props.opts &&
        props.opts.map((o, i) => (
          <Option key={i} value={o.value} {...o}>
            {o.label}
          </Option>
        ))}
    </Select>
  );
};

export const Default = () => (
  <Wrapper className="storybook-select">
    <SelectWrapper>
      <Title>Default Select</Title>
      <CustomSelect
        opts={defaultOptions}
        defaultValue={defaultOptions[1]}
        placeholder={'Custom placeholder...'}
      />
      <Title>Disabled Select</Title>
      <CustomSelect
        disabled
        opts={defaultOptions}
        defaultValue={defaultOptions[1].value}
      />
      <Title>Without options</Title>
      <Select onChange={null} />
      <Title>With scrollbar (more than 4 items)</Title>
      <CustomSelect opts={optionsWithoutSearchBar} />
      <Title>1000 items</Title>
      <CustomSelect opts={generateOptions(1000)} />
      <Title>With scroll/search (more than 8 items)</Title>
      <CustomSelect
        defaultValue={optionsWithSearchBar[1]}
        opts={optionsWithSearchBar}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          flex: '1',
          flexDirection: 'column',
        }}
      >
        <Title>Not enough space at the bottom</Title>
        <CustomSelect opts={optionsWithSearchBar} />
      </div>
    </SelectWrapper>
  </Wrapper>
);

export const Rounded = () => (
  <Wrapper>
    <SelectWrapper>
      <Title>Default Select</Title>
      <CustomSelect
        variant="rounded"
        opts={defaultOptions}
        defaultValue={defaultOptions[1]}
        placeholder={'Custom placeholder...'}
      />
      <Title>Disabled Select</Title>
      <CustomSelect
        variant="rounded"
        disabled
        opts={defaultOptions}
        defaultValue={defaultOptions[1]}
      />
      <Title>Without options</Title>
      <Select variant="rounded" onChange={null} />
      <Title>With scrollbar (more than 4 items)</Title>
      <CustomSelect variant="rounded" opts={optionsWithoutSearchBar} />
      <Title>1000 items</Title>
      <CustomSelect variant="rounded" opts={generateOptions(1000)} />
      <Title>With scroll/search (more than 8 items)</Title>
      <CustomSelect variant="rounded" opts={optionsWithSearchBar} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          flex: '1',
          flexDirection: 'column',
        }}
      >
        <Title>Not enough space at the bottom</Title>
        <CustomSelect variant="rounded" opts={optionsWithSearchBar} />
      </div>
    </SelectWrapper>
  </Wrapper>
);
