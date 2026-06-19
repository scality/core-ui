import React from 'react';
import { TextBadge } from '../src/lib/components/textbadge/TextBadge.component';
import { Wrapper, Title } from './common';
import { IconHelp } from '../src/lib/components/iconhelper/IconHelper';
import { Text } from '../src/lib/components/text/Text.component';
export default {
  title: 'Components/TextBadge',
  component: TextBadge,
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
      </Wrapper>
    );
  },
};
