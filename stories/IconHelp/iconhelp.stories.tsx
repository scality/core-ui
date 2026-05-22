import React from 'react';
import { IconHelp } from '../../src/lib/components/iconhelper/IconHelper';
import { Text } from '../../src/lib/components/text/Text.component';
import { Stack } from '../../src/lib/spacing';
import { Wrapper } from '../common';

export default {
  title: 'Components/IconHelp',
  component: IconHelp,
  decorators: [(story: () => React.ReactNode) => <Wrapper>{story()}</Wrapper>],
};

export const Simple = {
  name: 'Simple',
  render: () => (
    <Text>
      Replication policy{' '}
      <IconHelp
        tooltipMessage="Defines how objects are replicated across locations."
        aria-label="More info about replication policy"
      />
    </Text>
  ),
};

export const WithPlacement = {
  name: 'Tooltip placement',
  render: () => (
    <Stack direction="vertical" gap="r24">
      <Text>
        Placement <b>top</b>{' '}
        <IconHelp
          placement="top"
          tooltipMessage="Appears above the icon."
          aria-label="Top tooltip"
        />
      </Text>
      <Text>
        Placement <b>right</b> (default){' '}
        <IconHelp
          placement="right"
          tooltipMessage="Appears to the right of the icon."
          aria-label="Right tooltip"
        />
      </Text>
      <Text>
        Placement <b>bottom</b>{' '}
        <IconHelp
          placement="bottom"
          tooltipMessage="Appears below the icon."
          aria-label="Bottom tooltip"
        />
      </Text>
      <Text>
        Placement <b>left</b>{' '}
        <IconHelp
          placement="left"
          tooltipMessage="Appears to the left of the icon."
          aria-label="Left tooltip"
        />
      </Text>
    </Stack>
  ),
};

const KeyValueRow = ({
  label,
  value,
  helpMessage,
  helpAriaLabel,
}: {
  label: string;
  value: React.ReactNode;
  helpMessage?: React.ReactNode;
  helpAriaLabel?: string;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '200px 1fr',
      alignItems: 'baseline',
      gap: '16px',
      padding: '6px 0',
    }}
  >
    <Text color="textSecondary">{label}</Text>
    <Text>
      {value}
      {helpMessage && (
        <>
          {' '}
          <IconHelp
            tooltipMessage={helpMessage}
            aria-label={helpAriaLabel ?? `More info about ${label}`}
          />
        </>
      )}
    </Text>
  </div>
);

export const InKeyValueList = {
  name: 'Explaining values',
  render: () => (
    <div style={{ maxWidth: 560 }}>
      <KeyValueRow label="Bucket name" value="prod-customer-assets" />
      <KeyValueRow
        label="Versioning"
        value="Enabled"
        helpMessage="Once enabled, every overwrite or delete keeps the previous version."
      />
      <KeyValueRow
        label="Object lock"
        value="Governance"
        helpMessage="Governance mode allows privileged users to change retention; Compliance mode does not."
      />
      <KeyValueRow
        label="Storage class"
        value="Standard"
        helpMessage="Affects durability, latency and pricing of stored objects."
      />
      <KeyValueRow label="Region" value="us-east-1" />
    </div>
  ),
};
