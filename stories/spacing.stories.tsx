import React from 'react';
import { spacing, Stack, Wrap } from '../src/lib/spacing';
import { Icon } from '../src/lib/components/icon/Icon.component';
import {
  SecondaryText,
  LargerText,
  EmphaseText,
  SmallerSecondaryText,
} from '../src/lib/components/text/Text.component';
import { TextBadge } from '../src/lib/components/textbadge/TextBadge.component';
import { brand } from '../src/lib/style/theme';

export default {
  title: 'Components/Spacing Utils',
  component: Stack,
};

export const Playground = {
  render:(args) => (
    <Stack {...args} >
      <Icon name="Account" size="2x" color="infoPrimary" withWrapper />
      <LargerText>6 Accounts</LargerText>
    </Stack>
  )
}

export const StackStory = {
  render: ({}) => {
    return (
      <>
        <h2>Banner example</h2>
        <div
          style={{
            background: brand.backgroundLevel2,
            padding: spacing.r8,
            paddingLeft: spacing.r36,
          }}
        >
          <Stack withSeparators={true} gap="r32">
            <Stack gap="r20">
              <Icon name="Account" size="2x" color="infoPrimary" withWrapper />
              <Stack direction="vertical" gap="r4">
                <LargerText>6 Accounts</LargerText>
                <SmallerSecondaryText>for this instance</SmallerSecondaryText>
              </Stack>
            </Stack>
            <Stack gap="r32">
              <Stack>
                <Icon name={'Check-circle'} color={'statusHealthy'} />
                <SecondaryText>Replication</SecondaryText>
              </Stack>
              <Stack>
                <Icon name={'Check-circle'} color={'statusHealthy'} />
                <SecondaryText>Expiration</SecondaryText>
              </Stack>
              <Stack>
                <Icon name={'Check-circle'} color={'statusHealthy'} />
                <SecondaryText>Transition</SecondaryText>
              </Stack>
            </Stack>
            <Stack direction="vertical" gap="r4">
              <Stack gap="r4">
                <EmphaseText>Active Alerts</EmphaseText>
                <TextBadge text="0" variant="infoPrimary" />
              </Stack>
              <SmallerSecondaryText>No active alerts</SmallerSecondaryText>
            </Stack>
          </Stack>
        </div>

        <h2>Vertical divided example</h2>
        <div
          style={{
            background: brand.backgroundLevel4,
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
    return (
      <div
        style={{
          background: brand.backgroundLevel2,
          padding: spacing.r8,
          color: brand.textPrimary,
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
