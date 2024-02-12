import React from 'react';
import { useTheme } from 'styled-components';
import { Icon } from '../src/lib/components/icon/Icon.component';
import {
  EmphaseText,
  LargerText,
  SecondaryText,
  SmallerSecondaryText,
} from '../src/lib/components/text/Text.component';
import { TextBadge } from '../src/lib/components/textbadge/TextBadge.component';
import { spacing, Stack, Wrap } from '../src/lib/spacing';

export default {
  title: 'Components/Styling/Spacing Utils',
  component: Stack,
};

export const Playground = {
  render: (args) => (
    <Stack {...args}>
      <Icon name="Account" size="2x" color="infoPrimary" withWrapper />
      <LargerText>6 Accounts</LargerText>
    </Stack>
  ),
};

export const StackStory = {
  render: ({}) => {
    const theme = useTheme();
    return (
      <>
        <h2>Banner example</h2>
        <div
          style={{
            background: theme.backgroundLevel2,
            padding: spacing.r8,
            paddingLeft: spacing.r36,
          }}
        >
          <Stack withSeparators={true} gap="r32">
            <Stack gap="r20">
              <Icon name="Account" size="2x" color="infoPrimary" withWrapper />
              <Stack direction="vertical" gap="r4">
                <LargerText>Title</LargerText>
                <SmallerSecondaryText>Subtitle</SmallerSecondaryText>
              </Stack>
            </Stack>
            <Stack gap="r32">
              <Stack>
                <Icon name={'Check-circle'} color={'statusHealthy'} />
                <SecondaryText>Status 1</SecondaryText>
              </Stack>
              <Stack>
                <Icon name={'Check-circle'} color={'statusHealthy'} />
                <SecondaryText>Status 2</SecondaryText>
              </Stack>
              <Stack>
                <Icon name={'Check-circle'} color={'statusHealthy'} />
                <SecondaryText>Status 3</SecondaryText>
              </Stack>
            </Stack>
            <Stack direction="vertical" gap="r4">
              <Stack gap="r4">
                <EmphaseText>Alerts</EmphaseText>
                <TextBadge text="0" variant="infoPrimary" />
              </Stack>
              <SmallerSecondaryText>No alerts</SmallerSecondaryText>
            </Stack>
          </Stack>
        </div>

        <h2>Vertical divided example</h2>
        <div
          style={{
            background: theme.backgroundLevel4,
            padding: spacing.r8,
            paddingLeft: spacing.r36,
          }}
        >
          <Stack direction="vertical" gap="r24" withSeparators>
            <EmphaseText>Section 1</EmphaseText>
            <EmphaseText>Section 2</EmphaseText>
          </Stack>
        </div>
      </>
    );
  },
};

export const WrapStory = {
  render: ({}) => {
    const theme = useTheme();
    return (
      <div
        style={{
          background: theme.backgroundLevel2,
          padding: spacing.r8,
          color: theme.textPrimary,
        }}
      >
        <Wrap>
          <Stack>
            <Icon name="Account" />
            <Icon name="User" />
            <Icon name="Bucket" />
          </Stack>
          <Stack>
            <Icon name="Account" />
            <Icon name="User" />
            <Icon name="Bucket" />
          </Stack>
        </Wrap>
      </div>
    );
  },
};
