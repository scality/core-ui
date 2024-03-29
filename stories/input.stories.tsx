import React from 'react';
import { Input as InputV2 } from '../src/lib/components/inputv2/inputv2';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';
import { Wrapper } from './common';

const sizes = ['1/3', '1/2', '2/3', '1'];

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

export default {
  title: 'Components/Inputs/Input',
  component: InputV2,
  decorators: [
    (story) => <Wrapper style={{ minHeight: '15rem' }}>{story()}</Wrapper>,
  ],
  args: {
    onChange: action('onChange'),
  },
  argTypes: {
    size: {
      options: sizes,
    },
  },
};

export const Playground = {
  args: {
    placeholder: 'Try me',
  },
};

export const WithPlaceholder = {
  args: {
    placeholder: 'Some text',
  },
};

export const SizeScale = {
  render: (args) => {
    return (
      <InputWrapper>
        {sizes.map((size) => (
          <InputV2
            size={size}
            placeholder={`Size : ${size}`}
            {...args}
          ></InputV2>
        ))}
      </InputWrapper>
    );
  },
};

export const WithIcons = {
  render: (args) => {
    return (
      <InputWrapper>
        <InputV2
          id="ileft"
          leftIcon="Account"
          placeholder="With a left icon"
          {...args}
        />
        <InputV2
          id="iright"
          rightIcon="Alert"
          placeholder="With a right icon"
          {...args}
        />
      </InputWrapper>
    );
  },
};

export const WithError = {
  args: {
    error: 'Something bad',
    placeholder: 'Some text',
  },
};

export const Disabled = {
  args: {
    disabled: true,
    placeholder: 'Some text',
  },
};

/*
const options = Array.from(new Array(1000), (_, index) => ({
  label: `Item ${index}`,
  value: index,
  'data-cy': `Item_${index}`,
}));


const ExampleInput = ({}) => {
  const CustomInput = styled.div`
    .sc-input-error {
      width: 200px;
    }
  `;
  const [numberValue, setNumberValue] = useState(1);
  return (
    <Wrapper>
      <Title>Input without label</Title>
      <Input
        id="id1"
        value="value"
        onChange={action('onChange')}
        data-cy="default_input"
      />
      <Title>Input disabled</Title>
      <Input
        id="id1"
        value="value"
        disabled={true}
        onChange={action('onChange')}
        data-cy="default_input"
      />
      <Title>Input with label</Title>
      <Input
        id="id2"
        label="label"
        value="value"
        onChange={action('onChange')}
      />
      <Title>Input with error</Title>
      <Input
        id="id3"
        label="label"
        value="value"
        error="error"
        onChange={action('onChange')}
      />
      <Title>Input with long error</Title>
      <CustomInput>
        <Input
          id="id3"
          label="label"
          value="value"
          error="long error error error error error error error error error"
          onChange={action('onChange')}
        />
      </CustomInput>
      <Title>Checkbox Input</Title>
      <Input
        id="id4"
        label="label"
        value="value"
        onChange={action('onChange')}
        type="checkbox"
      />
      <Title>Checkbox Input with error</Title>
      <Input
        id="id5"
        label="label"
        value="value"
        onChange={action('onChange')}
        type="checkbox"
        error="error"
      />
      <Title>Select Input</Title>
      <Input
        id="id6"
        label="label"
        onChange={action('onChange')}
        type="select"
        options={options}
        placeholder="Select an item..."
        noOptionsMessage={() => 'Not found'}
        value={options[0]}
      />
      <Title>Textarea Input</Title>
      <Input
        id="id7"
        label="label"
        onChange={action('onChange')}
        type="textarea"
        placeholder="Write here..."
        value=""
      />
      <Title>Textarea Input with error</Title>
      <Input
        id="id7"
        label="label"
        onChange={action('onChange')}
        type="textarea"
        placeholder="Write here..."
        error="error"
        value="Hello"
        cols={50}
        rows={5}
      />
      <Title>Number Input (Max 100)</Title>
      <Input
        id="id8"
        value={numberValue}
        onChange={(e) => {
          setNumberValue(e.currentTarget.value);
        }}
        type="number"
        min="0"
        max="100"
        error={
          parseInt(numberValue) > 100
            ? 'The input number must be less than or equal to 100'
            : ''
        }
      />
    </Wrapper>
  );
};

export default {
  title: 'Components/Input/Input',
  component: Input,
};
export const Default = {
  render: ({}) => {
    return <ExampleInput />;
  },
};
*/
