import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon } from '../../src/lib/components/icon/Icon.component';
import { Modal } from '../../src/lib/components/modal/Modal.component';
import { Select } from '../../src/lib/components/selectv2/Selectv2.component';
import { Wrapper } from '../common';
import { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';

type SelectStory = StoryObj<typeof Select>;
const meta: Meta<typeof Select> = {
  title: 'Components/Inputs/Select',
  component: Select,
  // decorators: [
  //   (story) => <Wrapper style={{ minHeight: '15rem' }}>{story()}</Wrapper>,
  // ],
};

export default meta;
const sizes = ['1/3', '1/2', '2/3', '1'] as const;

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 20rem;
  height: 100%;
  justify-content: space-between;
`;

const generateOptions = (n = 10) =>
  Array.from(new Array(n), (_, index) => (
    <Select.Option
      key={index}
      value={`Option${index + 1}`}
      icon={index % 5 === 0 ? <Icon name={'Check'} /> : null}
    >{`Option ${index + 1}`}</Select.Option>
  ));

const optionsWithSearchBar = generateOptions(25);
const optionsWithoutSearchBar = generateOptions(7);
const defaultOptions = generateOptions(5);
const thousandsOfOptions = generateOptions(1000);
const optionsWithDisabledWithoutMessage = optionsWithSearchBar.map(
  (option, index) => {
    if (index % 3 === 0) {
      return React.cloneElement(option, {
        disabled: true,
      });
    }
    return option;
  },
);
const optionsWithDisabledWithMessage = optionsWithDisabledWithoutMessage.map(
  (option, index) => {
    if (index % 3 === 0) {
      return React.cloneElement(option, {
        disabled: true,
        disabledReason: "This option can't be selected for some reason",
      });
    }
    return option;
  },
);

export const Playground: SelectStory = {
  args: {
    children: defaultOptions,
    placeholder: 'Playground',
  },
};

export const WithoutOptions: SelectStory = {
  args: {
    children: [],
    placeholder: 'No options',
  },
};

export const DisabledSelect: SelectStory = {
  args: {
    disabled: true,
    children: defaultOptions,
  },
};

export const WithScrollbar: SelectStory = {
  name: 'More than 4 items',
  args: {
    children: optionsWithoutSearchBar,
  },
};

export const WithSearchBar: SelectStory = {
  args: {
    children: optionsWithSearchBar,
  },
};

export const LotsOfOptions: SelectStory = {
  args: {
    children: thousandsOfOptions,
  },
};
export const WithDisabledOptionsWithoutMessage: SelectStory = {
  name: 'Options disabled',
  args: {
    children: optionsWithDisabledWithoutMessage,
  },
};

export const WithDisabledOptionsWithMessage: SelectStory = {
  name: 'Options disabled with message',
  args: {
    children: optionsWithDisabledWithMessage,
  },
};

export const DifferentSizes: SelectStory = {
  name: 'Sizes',
  render: (args) => (
    <SelectWrapper>
      {sizes.map((size) => (
        <Select key={size} size={size} {...args}></Select>
      ))}
    </SelectWrapper>
  ),
  args: {
    children: defaultOptions,
  },
};

export const InsideModal: SelectStory = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button onClick={() => setIsOpen(true)}>Open modal</button>

        {isOpen && (
          <Modal isOpen title="select" close={() => setIsOpen(false)}>
            <Select menuPosition="fixed" {...args}></Select>
          </Modal>
        )}
      </>
    );
  },
  args: {
    children: optionsWithoutSearchBar,
  },
};

export const NotEnoughPlaceAtTheBottom: SelectStory = {
  name: 'Menu open at the top',
  render: (args) => (
    <div
      style={{
        display: 'flex',
        minHeight: '12rem',
        height: '100%',
        alignItems: 'flex-end',
      }}
    >
      <Select {...args}></Select>
    </div>
  ),
  args: {
    children: optionsWithSearchBar,
  },
};

export const WithDefaultValue: SelectStory = {
  render: (args) => {
    const [{ value }, updateArgs] = useArgs();
    return (
      <Select
        {...args}
        onChange={(value) => updateArgs({ value })}
        value={value}
      ></Select>
    );
  },
  args: {
    value: defaultOptions[0].props.value,
    placeholder: 'Select an option',
    children: defaultOptions,
  },
};
