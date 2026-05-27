import { action } from 'storybook/actions';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import React, { useState } from 'react';
import {
  RadioGroup,
  RadioGroupProps,
} from '../../src/lib/components/radio/RadioGroup.component';
import {
  Form,
  FormGroup,
  FormSection,
} from '../../src/lib/components/form/Form.component';

type RadioGroupStory = StoryObj<RadioGroupProps>;

const retentionOptions = [
  { value: 'governance', label: 'Governance' },
  { value: 'compliance', label: 'Compliance' },
  { value: 'none', label: 'None' },
];

const meta: Meta<RadioGroupProps> = {
  title: 'Components/Inputs/Radio',
  component: RadioGroup,
};

export default meta;

export const Playground: RadioGroupStory = {
  args: {
    name: 'playground',
    label: 'Retention mode',
    value: 'governance',
    options: retentionOptions,
    onChange: action('RadioGroup changed'),
  },
};

export const RadioGroupExample: RadioGroupStory = {
  render: () => {
    const [selected, setSelected] = useState('governance');
    return (
      <RadioGroup
        name="retention-mode"
        label="Retention mode"
        value={selected}
        onChange={setSelected}
        options={retentionOptions}
      />
    );
  },
};

export const Horizontal: RadioGroupStory = {
  render: () => {
    const [selected, setSelected] = useState('small');
    return (
      <RadioGroup
        name="size"
        label="Size"
        direction="horizontal"
        value={selected}
        onChange={setSelected}
        options={[
          { value: 'small', label: 'Small' },
          { value: 'medium', label: 'Medium' },
          { value: 'large', label: 'Large' },
        ]}
      />
    );
  },
};

export const AllStates: RadioGroupStory = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <RadioGroup
        name="state-unchecked"
        aria-label="Unchecked example"
        value=""
        onChange={() => {}}
        options={[{ value: 'a', label: 'Unchecked' }]}
      />
      <RadioGroup
        name="state-checked"
        aria-label="Checked example"
        value="a"
        onChange={() => {}}
        options={[{ value: 'a', label: 'Checked' }]}
      />
      <RadioGroup
        name="state-disabled"
        aria-label="Disabled example"
        value=""
        onChange={() => {}}
        options={[{ value: 'a', label: 'Disabled', disabled: true }]}
      />
      <RadioGroup
        name="state-disabled-checked"
        aria-label="Disabled checked example"
        value="a"
        onChange={() => {}}
        options={[{ value: 'a', label: 'Disabled checked', disabled: true }]}
      />
    </div>
  ),
};

export const DisabledGroup: RadioGroupStory = {
  render: () => (
    <RadioGroup
      name="disabled-group"
      label="Disabled group"
      value="a"
      onChange={() => {}}
      disabled
      options={[
        { value: 'a', label: 'Option A' },
        { value: 'b', label: 'Option B' },
      ]}
    />
  ),
};

export const WithDisabledReason: RadioGroupStory = {
  render: () => {
    const [selected, setSelected] = useState('governance');
    return (
      <RadioGroup
        name="retention-mode-locked"
        label="Retention mode"
        value={selected}
        onChange={setSelected}
        options={[
          { value: 'governance', label: 'Governance' },
          {
            value: 'compliance',
            label: 'Compliance',
            disabled: true,
            disabledReason:
              'Compliance mode requires an upgraded license.',
          },
          { value: 'none', label: 'None' },
        ]}
      />
    );
  },
};

export const WithoutVisibleLabel: RadioGroupStory = {
  render: () => {
    const [selected, setSelected] = useState('a');
    return (
      <RadioGroup
        name="inline-row"
        aria-label="Row selection"
        direction="horizontal"
        value={selected}
        onChange={setSelected}
        options={[
          { value: 'a', label: 'Option A' },
          { value: 'b', label: 'Option B' },
        ]}
      />
    );
  },
};

export const FormGroupExample: RadioGroupStory = {
  render: () => {
    const [retention, setRetention] = useState('governance');
    return (
      <Form layout={{ kind: 'tab' }}>
        <FormSection>
          <FormGroup
            id="retention-mode"
            label="Retention mode"
            direction="vertical"
            help="Choose how this bucket retains objects."
            content={
              <RadioGroup
                name="retention-mode"
                aria-labelledby="label-retention-mode"
                value={retention}
                onChange={setRetention}
                options={retentionOptions}
              />
            }
          />
        </FormSection>
      </Form>
    );
  },
};
