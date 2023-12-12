import React from 'react';
import { InfoMessage } from '../src/lib/components/infomessage/InfoMessage.component';
import { Wrapper } from './common';
import { defaultTheme } from '../src/lib/style/theme';
import { Meta, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof InfoMessage>;

const meta: Meta<typeof InfoMessage> = {
  title: 'Components/InfoMessage',
  component: InfoMessage,
  decorators: [(story) => <Wrapper>{story()}</Wrapper>],
};

export default meta;

export const Playground: StoryObj<
  React.ComponentProps<typeof InfoMessage> & { backgroundColor?: string }
> = {
  render: ({ backgroundColor, ...args }) => (
    <div
      style={{
        backgroundColor,
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
  ),
  argTypes: {
    backgroundColor: {
      description: 'Background color of the parent element',
      options: ['Level1', 'Level2', 'Level3', 'Level4'],
      mapping: {
        Level1: defaultTheme.darkRebrand.backgroundLevel1,
        Level2: defaultTheme.darkRebrand.backgroundLevel2,
        Level3: defaultTheme.darkRebrand.backgroundLevel3,
        Level4: defaultTheme.darkRebrand.backgroundLevel4,
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
            backgroundColor: defaultTheme.darkRebrand.backgroundLevel3,
            padding: '1rem',
          }}
        >
          <InfoMessage {...args} />
        </div>
        <div
          style={{
            height: '10rem',
            backgroundColor: defaultTheme.darkRebrand.backgroundLevel2,
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
