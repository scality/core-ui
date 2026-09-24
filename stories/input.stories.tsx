import React from 'react';
import { Input as InputV2 } from '../src/lib/components/inputv2/inputv2';
import { action } from 'storybook/actions';
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
