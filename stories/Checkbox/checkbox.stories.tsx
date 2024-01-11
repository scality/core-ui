import React, { ComponentProps, useEffect, useRef } from 'react';
import { action } from '@storybook/addon-actions';
import { Checkbox } from '../../src/lib/components/checkbox/Checkbox.component';
import { Wrapper } from '../common';
import { Meta, StoryObj } from '@storybook/react';

type CheckboxStory = StoryObj<typeof Checkbox>;

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Inputs/Checkbox',
  component: Checkbox,
  decorators: [
    (story) => (
      <Wrapper style={{ minHeight: '10vh', padding: '3rem' }}>
        {story()}
      </Wrapper>
    ),
  ],
  args: {
    label: 'interrested ?',
    onChange: action('Checkbox clicked'),
  },
};

export default meta;

export const DefaultCheckbox: CheckboxStory = {};

export const IndeterminateCheckbox: StoryObj<
  ComponentProps<typeof Checkbox> & { 'data-cy': string }
> = {
  render: (args) => {
    const checkboxRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
      if (checkboxRef.current) {
        checkboxRef.current.indeterminate = true;
      }
    }, [checkboxRef]);
    return <Checkbox ref={checkboxRef} {...args} />;
  },
  args: {
    'data-cy': 'checked_checkbox',
  },
};

export const CheckedCheckbox: StoryObj<
  ComponentProps<typeof Checkbox> & { 'data-cy': string }
> = {
  args: {
    checked: true,
    'data-cy': 'checked_checkbox',
  },
};

export const UncheckedCheckbox: CheckboxStory = {
  args: {
    checked: false,
  },
};

export const DisabledCheckboxes: CheckboxStory = {
  render: () => {
    return (
      <>
        <Checkbox disabled checked label="Disabled & checked " />
        <Checkbox disabled label="Disabled & unchecked" />
      </>
    );
  },
};

export const DisabledCheckedCheckbox: CheckboxStory = {
  args: {
    checked: true,
    disabled: true,
  },
};
export const DisabledUncheckedCheckbox: CheckboxStory = {
  args: {
    checked: false,
    disabled: true,
  },
};

export const Playground: CheckboxStory = {};
