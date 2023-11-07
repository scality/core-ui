import React from 'react';
import styled from 'styled-components';
import {
  Card,
  CardHeader,
  CardBody,
  CardBodyContainer,
} from '../src/lib/components/card/Card.component';
import { CircularProgressBar } from '../src/lib/components/circularprogressbar/CircularProgressBar.component';
import { Text, Wrapper } from './common';
import { brand } from '../src/lib/style/theme';
import { action } from '@storybook/addon-actions';

// RGB color in theme provoke an error, excludes from control options
const colors = Object.keys(brand).filter((color) => !/RGB/.test(color));

export default {
  title: 'Components/Card',
  component: Card,
  decorators: [
    (story) => (
      <Wrapper style={{ minHeight: '10vh', padding: '3rem' }}>
        {story()}
      </Wrapper>
    ),
  ],
  argTypes: {
    status: {
      options: ['healthy', 'warning', 'critical'],
    },
    onClick: {
      description: 'Click handler',
    },
    children: { table: { disable: true } },
    headerBackgroundColor: {
      control: { type: 'select' },
      options: colors,
    },
    bodyBackgroundColor: {
      options: colors,
      control: { type: 'select' },
    },
  },
};
const Row = styled.div`
  display: flex;
  & > * {
    margin-left: 10px;
  }
`;
const defaultBody = (
  <CircularProgressBar
    color={brand.buttonSecondary}
    backgroundColor={brand.textTertiary}
    radius={30}
    strokeWidth={5}
    percent={60}
  >
    <Text
      className="sc-circularprogressbar-text"
      x="50%"
      y="50%"
      dominantBaseline="middle"
      textAnchor="middle"
    >
      60%
    </Text>
  </CircularProgressBar>
);
const defaultPropsCard = {
  width: '160px',
  height: '140px',
  onClick: action('Card Clicked'),
};
const statuses = ['healthy', 'warning', 'critical'];

export const Playground = {
  args: {
    ...defaultPropsCard,
    children: [
      <CardHeader>
        <div>RINGXcore</div>
      </CardHeader>,
      <CardBodyContainer>
        <CardBody>{defaultBody}</CardBody>
      </CardBodyContainer>,
    ],
    status: undefined,
  },
};

export const NormalCards = {
  render: (args) => {
    return (
      <Row>
        {statuses.map((status) => (
          <Card status={status} {...args} />
        ))}
      </Row>
    );
  },
  args: {
    ...defaultPropsCard,
    children: [
      <CardHeader>
        <div>RINGXcore</div>
      </CardHeader>,
      <CardBodyContainer>
        <CardBody>{defaultBody}</CardBody>
      </CardBodyContainer>,
    ],
  },
};

export const DisabledCards = {
  ...NormalCards,
  args: {
    ...NormalCards.args,
    disabled: true,
  },
};

export const ActiveCards = {
  ...NormalCards,
  args: {
    ...NormalCards.args,
    active: true,
  },
};

export const NoOnClickProps = {
  name: 'No onClick props',
  ...NormalCards,
  args: {
    ...NormalCards.args,
    onClick: null,
  },
};

export const NoHeaders = {
  args: {
    ...defaultPropsCard,
    children: (
      <CardBodyContainer>
        <CardBody>{defaultBody}</CardBody>
      </CardBodyContainer>
    ),
  },
};

export const NoBody = {
  args: {
    ...defaultPropsCard,
    status: 'critical',
    children: (
      <CardHeader>
        <div>RINGXcore</div>
      </CardHeader>
    ),
  },
};

export const NoBodyWithAutoHeight = {
  ...NoBody,
  args: {
    ...NoBody.args,
    height: 'auto',
  },
};

export const MultipleBodies = {
  args: {
    ...defaultPropsCard,
    status: 'critical',
    children: [
      <CardHeader>
        <div>RINGXcore</div>
      </CardHeader>,
      <CardBodyContainer>
        <CardBody>{defaultBody}</CardBody>
        <CardBody>{defaultBody}</CardBody>
      </CardBodyContainer>,
    ],
  },
};

export const CustomizedCards = {
  args: {
    ...NormalCards.args,
    headerBackgroundColor: 'buttonPrimary',
    bodyBackgroundColor: 'infoSecondary',
    status: undefined,
    height: '200px',
  },
};
