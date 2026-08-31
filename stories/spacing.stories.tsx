import React from 'react';
import styled, { useTheme } from 'styled-components';
import { Icon } from '../src/lib/components/icon/Icon.component';
import {
  EmphaseText,
  LargerText,
  SecondaryText,
  SmallerSecondaryText,
  Text,
} from '../src/lib/components/text/Text.component';
import { TextBadge } from '../src/lib/components/textbadge/TextBadge.component';
import { spacing, Stack, Wrap } from '../src/lib/spacing';

export default {
  title: 'Components/Styling/Spacing Utils',
  component: Stack,
};

export const IconAndLabel = {
  name: 'Icon and label (r8)',
  parameters: { docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <Stack direction="vertical" gap="r16" style={{ padding: '1.5rem' }}>
      <Stack gap="r8">
        <Icon name="Check-circle" color="statusHealthy" />
        <Text color="textPrimary">Healthy</Text>
      </Stack>
      <Stack gap="r8">
        <Icon name="Exclamation-circle" color="statusWarning" />
        <Text color="textPrimary">Warning</Text>
      </Stack>
      <Stack gap="r8">
        <Icon name="Times-circle" color="statusCritical" />
        <Text color="textPrimary">Critical</Text>
      </Stack>
      <Stack gap="r8">
        <Icon name="Info-circle" color="infoPrimary" />
        <Text color="textPrimary">Information</Text>
      </Stack>
    </Stack>
  ),
};

export const Playground = {
  render: (args) => (
    <Stack {...args}>
      <Icon name="Account" size="2x" color="infoPrimary" withWrapper />
      <LargerText>My Title</LargerText>
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

// `stackBelow` queries the `responsive` container, so an ancestor has to
// establish one. `<Box container>` does this in app code.
const ResizableContainer = styled.div`
  container-type: inline-size;
  container-name: responsive;
  resize: horizontal;
  overflow: auto;
  min-width: 240px;
  max-width: 100%;
  width: 700px;
  background: ${(props) => props.theme.backgroundLevel2};
  padding: ${spacing.r16};
`;

export const StackBelowStory = {
  name: 'stackBelow — direction follows the container width',
  render: ({}) => (
    <>
      <h2>Drag the bottom-right handle below 500px</h2>
      <SecondaryText>
        One prop. The Stack flips from row to column in CSS only — no re-render
        — and the separators switch from the row treatment (a full-height rule)
        to the column treatment (a short dash) along with it.
      </SecondaryText>
      <ResizableContainer>
        <Stack withSeparators gap="r24" stackBelow={500}>
          <Stack gap="r16">
            <Icon name="Account" size="2x" color="infoPrimary" withWrapper />
            <Stack direction="vertical" gap="r4">
              <LargerText>12</LargerText>
              <SmallerSecondaryText>Accounts</SmallerSecondaryText>
            </Stack>
          </Stack>
          <Stack gap="r16">
            <Icon name="Bucket" size="2x" color="infoPrimary" withWrapper />
            <Stack direction="vertical" gap="r4">
              <LargerText>148</LargerText>
              <SmallerSecondaryText>Buckets</SmallerSecondaryText>
            </Stack>
          </Stack>
          <Stack gap="r16">
            <Icon
              name="Node-backend"
              size="2x"
              color="infoPrimary"
              withWrapper
            />
            <Stack direction="vertical" gap="r4">
              <LargerText>3</LargerText>
              <SmallerSecondaryText>Endpoints</SmallerSecondaryText>
            </Stack>
          </Stack>
        </Stack>
      </ResizableContainer>
    </>
  ),
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
