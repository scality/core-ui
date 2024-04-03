import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import React, { ComponentProps, useEffect, useRef } from 'react';
import {
  Checkbox,
  Props,
} from '../../src/lib/components/checkbox/Checkbox.component';
import { Column } from '../../src/lib/components/tablev2/Tablev2.component';
import { Box, Input, Table } from '../../src/lib/next';
import { Form, FormGroup, FormSection } from '../../src/lib';

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
            label="Enable this option ?"
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
      <Box width="500px" height="200px">
        <Table columns={columns} data={data} defaultSortingKey={'health'}>
          <Table.MultiSelectableContent
            onMultiSelectionChanged={action('Selection changed')}
          />
        </Table>
      </Box>
    );
  },
};
