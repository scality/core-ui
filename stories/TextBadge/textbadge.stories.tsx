import React from 'react';
import { TextBadge } from '../../src/lib/components/textbadge/TextBadge.component';
import { Wrapper, Title } from '../common';
import { IconHelp } from '../../src/lib/components/iconhelper/IconHelper';
import { Text } from '../../src/lib/components/text/Text.component';
import { Stack } from '../../src/lib/spacing';
export default {
  title: 'Components/TextBadge',
  component: TextBadge,
  parameters: {
    docs: {
      description: {
        component:
          'TextBadge has no outer horizontal margin (since CUI-51). When placing it next to a label or another badge, provide the spacing from the parent, e.g. wrap them in a gapped `Stack` or flex container.',
      },
    },
  },
};

export const Playground = {
  args: {
    text: 'Test me',
  },
};
export const Default = {
  render: ({}) => {
    return (
      <Wrapper>
        <Title>Text Badges</Title>
        <Stack gap="r8">
          <TextBadge text="0" />
          <TextBadge text="1" variant="statusHealthy" />
          <TextBadge text="2" variant="statusWarning" />
          <TextBadge text="3" variant="statusCritical" />
          <TextBadge text="Badge" variant="infoSecondary" />
          <TextBadge
            text={
              <>
                <Text>This is a badge with a tooltip</Text>
                <span style={{ marginLeft: '8px' }}>
                  <IconHelp
                    tooltipMessage={<div>This is a tooltip</div>}
                    title="Info"
                  />
                </span>
              </>
            }
          />
        </Stack>
      </Wrapper>
    );
  },
};

export const CustomColorAndRemovable = {
  render: ({}) => {
    return (
      <Wrapper>
        <Title>Custom color</Title>
        <TextBadge
          text="env:prod"
          customColor={{
            text: 'hsl(210, 70%, 65%)',
            backgroundColor: 'hsla(210, 70%, 65%, 0.16)',
            borderColor: 'hsl(210, 70%, 65%)',
          }}
        />
        <Title>Removable</Title>
        <Stack gap="r8">
          <TextBadge
            text="env:prod"
            customColor={{
              text: 'hsl(150, 70%, 60%)',
              backgroundColor: 'hsla(150, 70%, 60%, 0.16)',
            }}
            onRemove={() => alert('remove env:prod')}
            removeAriaLabel="Remove label env:prod"
          />
          <TextBadge
            text="Removable badge"
            variant="infoSecondary"
            onRemove={() => alert('remove badge')}
          />
        </Stack>
      </Wrapper>
    );
  },
};

export const LongLabelWraps = {
  render: ({}) => {
    return (
      <Wrapper>
        <Title>Long label wraps</Title>
        <div style={{ width: '240px' }}>
          <TextBadge
            text="A very long badge label that wraps onto several lines"
            variant="infoSecondary"
          />
        </div>
      </Wrapper>
    );
  },
};
