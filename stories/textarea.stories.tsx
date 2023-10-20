import React from 'react';
import { Wrapper, Title } from './common';
import { action } from '@storybook/addon-actions';
import { TextArea } from '../src/lib';
export default {
  title: 'Components/Input/TextArea',
  component: TextArea,
  argTypes: {
    value: {
      type: 'string',
    },
  },
};

export const Playground = {};

export const Default = {
  render: ({}) => {
    return (
      <Wrapper>
        <Title>Text Area without label</Title>
        <TextArea
          rows={10}
          cols={50}
          id={'text'}
          value="Add a note"
          onChange={action('onChange')}
        />
        <Title>Text Area change value</Title>
        <TextArea
          rows={10}
          cols={50}
          id={'text'}
          onChange={action('onChange')}
        />
        <Title>Text Area disabled</Title>
        <TextArea
          rows={10}
          cols={50}
          placeholder="Text area input"
          value=""
          disabled={true}
          onChange={action('onChange')}
        />
        <Title>Text Area disabled with content</Title>
        <TextArea
          rows={10}
          cols={50}
          placeholder="Text area input"
          value="hello"
          disabled={true}
          onChange={action('onChange')}
        />

        <Title>My test with width set</Title>
        <TextArea
          width="200px"
          value="hello"
          placeholder="Text area input"
          onChange={action('onChange')}
        />
        <Title>My test with width and variant set</Title>
        <TextArea
          width="200px"
          variant="text"
          placeholder="Text area input"
          onChange={action('onChange')}
        />
      </Wrapper>
    );
  },
};
