import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon } from '../../src/lib/components/icon/Icon.component';
import { Modal } from '../../src/lib/components/modal/Modal.component';
import { Select } from '../../src/lib/components/selectv2/Selectv2.component';
import { Wrapper } from '../common';

export default {
  title: 'Components/Inputs/Select',
  component: Select,
  decorators: [
    (story) => <Wrapper className="storybook-select">{story()}</Wrapper>,
  ],
};
const sizes = ['1/3', '1/2', '2/3', '1'];

const SelectWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  height: 15rem;
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
const defaultOptions = generateOptions(4);
const thousandsOfOptions = generateOptions(1000);
const optionsWithDisabled = optionsWithSearchBar.map((option, index) => {
  if (index % 3 === 0) {
    return React.cloneElement(option, {
      disabled: true,
      disabledReason: 'This option is disabled for some reason',
    });
  }
  return option;
});
export const Playground = {
  args: {
    children: defaultOptions,
    placeholder: 'Playground',
  },
};

export const WithoutOptions = {
  args: {
    options: [],
    placeholder: 'No options',
  },
};

export const DisabledSelect = {
  args: {
    disabled: true,
    defaultValue: defaultOptions[0].props.value,
    children: defaultOptions,
  },
};

export const WithScrollbar = {
  name: 'More than 4 items',
  args: {
    children: optionsWithoutSearchBar,
  },
};

export const WithSearchBar = {
  args: {
    children: optionsWithSearchBar,
  },
};

export const LotsOfOptions = {
  args: {
    children: thousandsOfOptions,
  },
};

export const WithDisabledOptions = {
  args: {
    children: optionsWithDisabled,
  },
};

export const DifferentSizes = {
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

export const NotEnoughPlaceAtTheBottom = {
  render: (args) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        height: '100vh',
        flex: '1',
        flexDirection: 'column',
      }}
    >
      <Select {...args}></Select>
    </div>
  ),
  args: {
    children: optionsWithSearchBar,
  },
};

export const InsideModal = {
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
    options: optionsWithoutSearchBar,
  },
};
