import React from 'react';
import { Wrapper, Title } from './common';
import { action } from '@storybook/addon-actions';
import {TextArea} from "../src/lib";
export default {
  title: 'Components/Input/TextArea',
  component: TextArea,
};
export const Default = () => {
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
    </Wrapper>
  );
};
