import React from 'react';
import { InfoMessage } from '../src/lib/components/infomessage/InfoMessage.component';
import { Wrapper } from './common';
import { Meta, StoryObj } from '@storybook/react';
import { useTheme } from 'styled-components';
import { CoreUITheme } from '../src/lib/style/theme';

type Story = StoryObj<typeof InfoMessage>;

const meta: Meta<typeof InfoMessage> = {
  title: 'Components/InfoMessage',
  component: InfoMessage,
  decorators: [(story) => <Wrapper>{story()}</Wrapper>],
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
        <div
          style={{
            padding: '1rem',
          }}
        >
          <InfoMessage
            title="What to do with this key?"
            content="This key is needed by the Veeam repository to access ARTESCA for data backup."
            link="test"
          />
        </div>
      </div>
    );
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
    link: 'toDocs',
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
