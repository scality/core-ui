import { action } from 'storybook/actions';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import React, { ComponentProps, useEffect, useRef } from 'react';
import {
  Checkbox,
  Props,
} from '../../src/lib/components/checkbox/Checkbox.component';
import { Tooltip } from '../../src/lib/components/tooltip/Tooltip.component';
import { Column } from '../../src/lib/components/tablev2/Tablev2.component';
import { Box, Input, Table } from '../../src/lib/next';
import { Form, FormGroup, FormSection } from '../../src/lib';
import { Stack } from '../../src/lib/spacing';

type CheckboxStory = StoryObj<Props>;

const meta: Meta<Props> = {
  title: 'Components/Inputs/Checkbox',
  component: Checkbox,
  args: {
    label: 'interested ?',
    onChange: action('Checkbox clicked'),
  },
  argTypes: {
    onChange: {
      description:
        'Function to be called when the checkbox is clicked, optional',
    },
    label: { control: 'text', description: 'Label of the checkbox, optional' },
    labelHelpTooltip: {
      control: 'text',
      description:
        'Help text for a `?` icon at the end of the label, optional. Ignored without a `label`.',
    },
    checked: {
      control: 'boolean',
      description: 'Control if the checkbox is checked, optional',
    },
    disabled: {
      control: 'boolean',
      description: 'Control if the checkbox is disabled, optional',
    },
    value: { control: 'text' },
  },
};

export default meta;

export const Playground: CheckboxStory = {};

export const ChoiceCheckbox: CheckboxStory = {
  render: () => {
    return (
      <>
        What are you interested in ?
        <Checkbox label="Sport" />
        <Checkbox label="Music" />
        <Checkbox label="Drawing" />
      </>
    );
  },
};

export const OptionCheckbox: CheckboxStory = {
  render: () => {
    return (
      <Form layout={{ kind: 'tab' }}>
        <FormSection>
          <FormGroup
            id="check"
            label="Enable this option"
            content={<Checkbox />}
          ></FormGroup>
        </FormSection>
      </Form>
    );
  },
};

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

export const DisabledWithReason: CheckboxStory = {
  render: () => (
    <Stack gap="r16">
      <Tooltip overlay="You don't have the required permissions to change this setting.">
        <span>
          <Checkbox disabled label="Enable versioning" />
        </span>
      </Tooltip>
      <Tooltip overlay="Object Lock can only be enabled at bucket creation and cannot be changed afterwards.">
        <span>
          <Checkbox disabled checked label="Object Lock" />
        </span>
      </Tooltip>
    </Stack>
  ),
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

export const AllStates: CheckboxStory = {
  render: () => {
    const indeterminateRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
      if (indeterminateRef.current) {
        indeterminateRef.current.indeterminate = true;
      }
    }, []);
    return (
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Checkbox label="Unchecked" checked={false} onChange={() => {}} />
        <Checkbox label="Checked" checked={true} onChange={() => {}} />
        <Checkbox ref={indeterminateRef} label="Indeterminate" onChange={() => {}} />
        <Checkbox label="Disabled" disabled checked={false} onChange={() => {}} />
        <Checkbox label="Disabled checked" disabled checked={true} onChange={() => {}} />
      </div>
    );
  },
};

export const IndeterminateUseCase = {
  render: ({}) => {
    const data = [
      {
        name: 'test 1',
        volume: 1,
        capacity: '1Gi',
      },
      {
        name: 'test 2',
        volume: 1,
        capacity: '1Gi',
      },
      {
        name: 'test 2',
        volume: 1,
        capacity: '1Gi',
      },
    ];

    const columns: Column<(typeof data)[number]>[] = [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Volume',
        accessor: 'volume',
      },
      {
        Header: 'Capacity',
        accessor: 'capacity',
      },
    ];

    return (
      <Box width="100%" height="250px">
        <Table columns={columns} data={data} defaultSortingKey={'name'}>
          <Table.MultiSelectableContent
            onMultiSelectionChanged={action('Selection changed')}
          />
        </Table>
      </Box>
    );
  },
};

/**
 * What a label does once it stops fitting on one line: it wraps, it keeps its help
 * icon on its last line, and with nowhere to break it breaks inside the word. Drag
 * `frameWidth` to about 200px; the box stays on each label's *first* line.
 *
 * Also where the accessible name is checked, since jsdom cannot reproduce it -- the
 * box used to be announced as "Short label More information".
 */
export const WrappedLabel: StoryObj<{ frameWidth: number }> = {
  argTypes: {
    frameWidth: {
      control: { type: 'range', min: 140, max: 600, step: 10 },
      description: 'Width of the frame the checkboxes have to fit in.',
    },
  },
  args: { frameWidth: 260 },
  render: ({ frameWidth }) => (
    <div
      data-testid="wrapped-label-frame"
      style={{
        width: frameWidth,
        border: '1px dashed #888',
        padding: '0.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}
    >
      <Checkbox
        label="I understand the consequences of activating TLS Verification"
        onChange={() => {}}
      />
      <Checkbox
        label="Delete objects after successful replication when checked"
        labelHelpTooltip="Objects are removed from the source only once the destination confirms the write."
        onChange={() => {}}
      />
      <Checkbox
        label="s3:ObjectCreated:CompleteMultipartUpload"
        onChange={() => {}}
      />
      <Checkbox
        label="Short label"
        labelHelpTooltip="A one-line label keeps its icon on the same line, as before."
        onChange={() => {}}
      />
    </div>
  ),
};
