import React from 'react';
import { CircularProgressBar } from '../src/lib/components/circularprogressbar/CircularProgressBar.component';
import { Wrapper, Title, Text } from './common';
export default {
  title: 'Components/Progress & loading/CircularProgressBar',
  component: CircularProgressBar,
  decorators: [
    (story) => (
      <Wrapper style={{ minHeight: '10vh', padding: '3rem' }}>
        {story()}
      </Wrapper>
    ),
  ],
  argTypes: {
    color: {
      control: {
        type: 'color',
      },
    },
    backgroundColor: {
      control: {
        type: 'color',
      },
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
};

export const Default = {
  args: {
    title: 'Total Capacity',
    radius: 70,
    percent: 60,
    children: (
      <Text
        className="sc-circularprogressbar-text"
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
      >
        60% used
      </Text>
    ),
  },
};

export const WithCustonColor = {
  args: {
    title: 'Total Capacity',
    color: '#00ff43',
    radius: 50,
    percent: 90,
    children: [
      <Text
        className="sc-circularprogressbar-text"
        x="50%"
        y="45%"
        dominantBaseline="middle"
        textAnchor="middle"
        style={{
          fontSize: '15px',
          fontWeight: '700',
        }}
      >
        4.9 PB
      </Text>,
      <Text
        className="sc-circularprogressbar-text"
        x="50%"
        y="60%"
        dominantBaseline="middle"
        textAnchor="middle"
      >
        used
      </Text>,
    ],
  },
};

/*
export const Default = {
  render: ({}) => {
    return (
      <Wrapper>
        <Title>With Default Color</Title>
        <CircularProgressBar title="Total Capacity" radius={70} percent={60}>
          <Text
            className="sc-circularprogressbar-text"
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
          >
            60% used
          </Text>
        </CircularProgressBar>
        <Title>With Custom Color</Title>
        <CircularProgressBar
          color="#00ff43"
          title="Total Capacity"
          radius={50}
          percent={90}
        >
          <Text
            className="sc-circularprogressbar-text"
            x="50%"
            y="45%"
            dominantBaseline="middle"
            textAnchor="middle"
            style={{
              fontSize: '15px',
              fontWeight: '700',
            }}
          >
            4.9 PB
          </Text>
          <Text
            className="sc-circularprogressbar-text"
            x="50%"
            y="60%"
            dominantBaseline="middle"
            textAnchor="middle"
          >
            used
          </Text>
        </CircularProgressBar>
      </Wrapper>
    );
  },
};
*/
