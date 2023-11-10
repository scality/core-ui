import React from 'react';
import { Wrapper, Title } from './common';
import { action } from '@storybook/addon-actions';
import { TextArea } from '../src/lib';
export default {
  title: 'Components/Input/TextArea',
  component: TextArea,
  args: {
    onChange: action('onChange'),
    name: 'TextArea',
  },
  argTypes: {
    name: {
      table: {
        disable: true,
      },
    },
    value: {
      type: 'string',
    },
    width: {
      type: 'string',
    },
    rows: {
      type: 'number',
    },
    cols: {
      type: 'number',
    },
  },
};

export const Playground = {};

export const DefaultTextArea = {
  args: {
    value: 'Some text',
  },
};

export const TextVariantTextArea = {
  args: {
    variant: 'text',
    value: 'Text area with "text" variant',
  },
};

export const DisabledTextArea = {
  args: {
    placeholder: 'This text area is disabled',
    disabled: true,
  },
};

export const WithWidthSet = {
  args: {
    placeholder: 'Text Area input',
    width: '300px',
  },
};

/**
 * The size of the textarea can also be set with 'rows' and 'cols' props
 */
export const RowsAndColsSet = {
  args: {
    rows: 20,
    cols: 40,
    placeholder: 'With rows = 20 and cols = 40',
  },
};
