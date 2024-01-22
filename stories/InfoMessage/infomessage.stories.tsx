import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { useTheme } from 'styled-components';
import { InfoMessage } from '../../src/lib/components/infomessage/InfoMessage.component';
import { CoreUITheme } from '../../src/lib/style/theme';

type Story = StoryObj<typeof InfoMessage>;

const meta: Meta<typeof InfoMessage> = {
  title: 'Components/InfoMessage',
  component: InfoMessage,
  argTypes: {
    title: {
      description: 'Title of the info message',
      control: {
        type: 'text',
      },
    },
    content: {
      description: 'Content of the info message',
      control: {
        type: 'text',
      },
    },
    link: {
      description: 'Link to an external resource',
    },
  },
};

export default meta;

export const Playground: StoryObj<
  React.ComponentProps<typeof InfoMessage> & {
    backgroundColor: keyof CoreUITheme;
  }
> = {
  render: ({ backgroundColor, ...args }) => {
    const theme = useTheme();

    return (
      <div
        style={{
          backgroundColor: theme[backgroundColor],
          padding: '1rem',
        }}
      >
        <InfoMessage {...args} />
      </div>
    );
  },
  args: {
    title: 'Title for the provided info',
    content: 'Some text that will help the user to understand what to do',
  },
  argTypes: {
    backgroundColor: {
      description: 'Background color of the parent element',
      options: ['Level1', 'Level2', 'Level3', 'Level4'],
      mapping: {
        Level1: 'backgroundLevel1',
        Level2: 'backgroundLevel2',
        Level3: 'backgroundLevel3',
        Level4: 'backgroundLevel4',
      },
      control: {
        type: 'radio',
      },
    },
  },
};

export const Default: Story = {
  args: {
    title: 'Title for the provided info',
    content: 'Some text that will help the user to understand what to do',
  },
};

export const WithLink: Story = {
  args: {
    ...Default.args,
    link: '',
  },
};

export const WithDifferentBackground: Story = {
  render: (args) => {
    const theme = useTheme();
    return (
      <div
        style={{
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          height: '30rem',
        }}
      >
        <div
          style={{
            height: '10rem',
            backgroundColor: theme.backgroundLevel3,
            padding: '1rem',
          }}
        >
          <InfoMessage {...args} />
        </div>
        <div
          style={{
            height: '10rem',
            backgroundColor: theme.backgroundLevel2,
            padding: '1rem',
          }}
        >
          <InfoMessage {...args} />
        </div>
      </div>
    );
  },
  args: {
    ...Default.args,
  },
};
