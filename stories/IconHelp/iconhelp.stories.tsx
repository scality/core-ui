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
    <Stack direction="horizontal" gap="r4">
      <Text>Replication policy</Text>
      <IconHelp
        tooltipMessage="Defines how objects are replicated across locations."
        aria-label="More info about replication policy"
      />
    </Stack>
  ),
};

export const WithPlacement = {
  name: 'Tooltip placement',
  render: () => (
    <Stack direction="vertical" gap="r24">
      <Stack direction="horizontal" gap="r4">
        <Text>
          Placement <b>top</b>
        </Text>
        <IconHelp
          placement="top"
          tooltipMessage="Appears above the icon."
          aria-label="Top tooltip"
        />
      </Stack>
      <Stack direction="horizontal" gap="r4">
        <Text>
          Placement <b>right</b> (default)
        </Text>
        <IconHelp
          placement="right"
          tooltipMessage="Appears to the right of the icon."
          aria-label="Right tooltip"
        />
      </Stack>
      <Stack direction="horizontal" gap="r4">
        <Text>
          Placement <b>bottom</b>
        </Text>
        <IconHelp
          placement="bottom"
          tooltipMessage="Appears below the icon."
          aria-label="Bottom tooltip"
        />
      </Stack>
      <Stack direction="horizontal" gap="r4">
        <Text>
          Placement <b>left</b>
        </Text>
        <IconHelp
          placement="left"
          tooltipMessage="Appears to the left of the icon."
          aria-label="Left tooltip"
        />
      </Stack>
    </Stack>
  ),
};

const KeyValueRow = ({
  label,
  labelHelp,
  labelAriaLabel,
  value,
  helpMessage,
  helpAriaLabel,
}: {
  label: string;
  labelHelp?: React.ReactNode;
  labelAriaLabel?: string;
  value: React.ReactNode;
  helpMessage?: React.ReactNode;
  helpAriaLabel?: string;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '220px 1fr',
      alignItems: 'baseline',
      gap: '16px',
      padding: '6px 0',
    }}
  >
    <Stack direction="horizontal" gap="r4">
      <Text color="textSecondary">{label}</Text>
      {labelHelp && (
        <IconHelp
          tooltipMessage={labelHelp}
          aria-label={labelAriaLabel ?? `More info about ${label}`}
        />
      )}
    </Stack>
    <Stack direction="horizontal" gap="r4">
      <Text>{value}</Text>
      {helpMessage && (
        <IconHelp
          tooltipMessage={helpMessage}
          aria-label={helpAriaLabel ?? `More info about ${label} value`}
        />
      )}
    </Stack>
  </div>
);

export const InKeyValueList = {
  name: 'Explaining keys and values',
  render: () => (
    <div style={{ maxWidth: 620 }}>
      <KeyValueRow label="Bucket name" value="prod-customer-assets" />
      <KeyValueRow
        label="Object lock"
        labelHelp="Object lock prevents objects from being deleted or overwritten for a fixed amount of time."
        value="Governance"
        helpMessage="Governance mode allows privileged users to change retention; Compliance mode does not."
      />
      <KeyValueRow
        label="RPO"
        labelHelp="Recovery Point Objective — the maximum acceptable amount of data loss measured in time."
        value="15 minutes"
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
