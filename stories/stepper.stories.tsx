import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Stepper,
  useStepper,
} from '../src/lib/components/steppers/Stepper.component';
import { Steppers } from '../src/lib/components/steppers/Steppers.component';
import styled from 'styled-components';
import { Button } from '../src/lib/components/buttonv2/Buttonv2.component';
import {
  Form,
  FormGroup,
  FormSection,
} from '../src/lib/components/form/Form.component';
import { Input } from '../src/lib/components/inputv2/inputv2';
import { Text } from '../src/lib/components/text/Text.component';
import { Wrapper as StoryWrapper } from './common';
import { Banner } from '../src/lib/components/banner/Banner.component';
import { CopyButton } from '../src/lib/components/buttonv2/CopyButton.component';
import { Icon } from '../src/lib/components/icon/Icon.component';
import { Select } from '../src/lib/components/selectv2/Selectv2.component';
import {
  Status,
  StatusIcon,
} from '../src/lib/components/statusicon/StatusIcon.component';
import {
  Column,
  Table,
} from '../src/lib/components/tablev2/Tablev2.component';
import { Toggle } from '../src/lib/components/toggle/Toggle.component';
import { Stack } from '../src/lib/spacing';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100%;
  min-width: 16rem;
  border: 1px solid rgba(128, 128, 128, 0.2);
  border-radius: 6px;
  padding: 16px;
`;

const StepBody = styled.div`
  flex: 1;
  padding: 8px 0;
`;

const StepActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding-top: 16px;
`;

const Hidden = styled.span`
  visibility: hidden;
`;

const FirstStepComponent = (props: Record<string, never>) => {
  const { next } = useStepper(StepIndexes.Step1, STEPS);
  return (
    <Wrapper>
      <StepBody>
        <Text>First Step</Text>
      </StepBody>
      <StepActions>
        <Hidden><Button label="Back" variant="secondary" onClick={() => {}} /></Hidden>
        <Button label="Next" variant="primary" onClick={() => next({ name: 'something' })} />
      </StepActions>
    </Wrapper>
  );
};

const SecondStepComponent = ({ name }: { name: string }) => {
  const { next, prev } = useStepper(StepIndexes.Step2, STEPS);
  return (
    <Wrapper>
      <StepBody>
        <Text>Second Step: {name}</Text>
      </StepBody>
      <StepActions>
        <Button label="Back" variant="secondary" onClick={() => prev({})} />
        <Button label="Next" variant="primary" onClick={() => next({ type: 'anything' })} />
      </StepActions>
    </Wrapper>
  );
};

const ThirdStepComponent = ({ type }: { type: string }) => {
  const { prev } = useStepper(StepIndexes.Step3, STEPS);
  return (
    <Wrapper>
      <StepBody>
        <Text>Third Step: {type}</Text>
      </StepBody>
      <StepActions>
        <Button label="Back" variant="secondary" onClick={() => prev({ name: 'something' })} />
        <Hidden><Button label="Next" variant="primary" onClick={() => {}} /></Hidden>
      </StepActions>
    </Wrapper>
  );
};

const STEPS = [
  { label: 'Step 1', Component: FirstStepComponent },
  { label: 'Step 2', Component: SecondStepComponent },
  { label: 'Step 3', Component: ThirdStepComponent },
] as const;

enum StepIndexes {
  Step1,
  Step2,
  Step3,
}

const meta: Meta<typeof Stepper> = {
  tags: ['autodocs'],
  title: 'Components/Progress & loading/Stepper',
  component: Stepper,
};
export default meta;

type Story = StoryObj<typeof Stepper>;
export const SimpleStepper: Story = {
  name: 'Simple Stepper',
  render: () => (
    <StoryWrapper>
      <Stepper steps={STEPS} />
    </StoryWrapper>
  ),
};

const STATE_STEPS = [
  { title: 'Configure' },
  { title: 'Schedule' },
  { title: 'Confirm' },
];

export const StateCompleted = {
  tags: ['!dev'],
  render: () => (
    <Steppers steps={STATE_STEPS} activeStep={2} />
  ),
};

export const StateInProgress = {
  tags: ['!dev'],
  render: () => (
    <Steppers
      steps={[
        { title: 'Configure' },
        { title: 'Schedule', inProgress: true },
        { title: 'Confirm' },
      ]}
      activeStep={1}
    />
  ),
};

export const StateError = {
  tags: ['!dev'],
  render: () => (
    <Steppers
      steps={[
        { title: 'Configure' },
        { title: 'Schedule', error: true },
        { title: 'Confirm' },
      ]}
      activeStep={1}
    />
  ),
};

type ActionStatus = 'pending' | 'running' | 'success' | 'error';

const SETUP_ACTIONS: { id: string; action: string; optional?: boolean }[] = [
  { id: 'workspace', action: 'Create the workspace' },
  { id: 'user', action: 'Create the service user' },
  { id: 'policy', action: 'Attach the access policy' },
  {
    id: 'retention',
    action: 'Enable retention on the workspace',
    optional: true,
  },
  { id: 'credentials', action: 'Generate the credentials' },
];

type ActionRow = {
  id: string;
  position: number;
  action: string;
  status: ActionStatus;
  retry: () => void;
};

const useSetupActions = () => {
  const [statuses, setStatuses] = useState<Record<string, ActionStatus>>(() =>
    Object.fromEntries(
      SETUP_ACTIONS.map((action) => [action.id, 'pending' as ActionStatus]),
    ),
  );
  const [retried, setRetried] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const current = SETUP_ACTIONS.find(
      (action) =>
        statuses[action.id] === 'pending' || statuses[action.id] === 'running',
    );
    if (!current) {
      return;
    }
    const isRunning = statuses[current.id] === 'running';
    const settled: ActionStatus =
      current.optional && !retried[current.id] ? 'error' : 'success';
    const timer = setTimeout(
      () =>
        setStatuses((previous) => ({
          ...previous,
          [current.id]: isRunning ? settled : 'running',
        })),
      isRunning ? 700 : 200,
    );
    return () => clearTimeout(timer);
  }, [statuses, retried]);

  const retry = useCallback((id: string) => {
    setRetried((previous) => ({ ...previous, [id]: true }));
    setStatuses((previous) => ({ ...previous, [id]: 'running' }));
  }, []);

  const rows: ActionRow[] = useMemo(
    () =>
      SETUP_ACTIONS.map((action, index) => ({
        id: action.id,
        position: index + 1,
        action: action.action,
        status: statuses[action.id],
        retry: () => retry(action.id),
      })),
    [statuses, retry],
  );

  return {
    rows,
    allRequiredComplete: SETUP_ACTIONS.every(
      (action) => action.optional || statuses[action.id] === 'success',
    ),
    hasOptionalFailure: SETUP_ACTIONS.some(
      (action) => action.optional && statuses[action.id] === 'error',
    ),
  };
};

const ACTION_STATUS_ICON: Record<ActionStatus, Status> = {
  pending: Status.UNKNOWN,
  running: Status.LOADING,
  success: Status.HEALTHY,
  error: Status.CRITICAL,
};

const ACTION_STATUS_LABEL: Record<ActionStatus, string> = {
  pending: 'Pending',
  running: 'In progress',
  success: 'Success',
  error: 'Failed',
};

const SETUP_ACTION_COLUMNS: Column<ActionRow>[] = [
  {
    Header: 'Step',
    accessor: 'position',
    cellStyle: { width: 'unset', flex: '0 0 4rem' },
  },
  {
    Header: 'Action',
    accessor: 'action',
    cellStyle: { width: 'unset', flex: '1', minWidth: 0 },
  },
  {
    Header: 'Status',
    accessor: 'status',
    cellStyle: { width: 'unset', flex: '0 1 15rem', minWidth: 0 },
    Cell: ({ row }: { row: { original: ActionRow } }) => (
      <Stack gap="r8">
        <StatusIcon status={ACTION_STATUS_ICON[row.original.status]} />
        <Text>{ACTION_STATUS_LABEL[row.original.status]}</Text>
        {row.original.status === 'error' && (
          <Button
            type="button"
            variant="secondary"
            label="Retry"
            icon={<Icon name="Redo" />}
            onClick={row.original.retry}
          />
        )}
      </Stack>
    ),
  },
];

const SetupActionsTable = ({ rows }: { rows: ActionRow[] }) => (
  <div style={{ height: '17rem' }}>
    <Table
      status="success"
      columns={SETUP_ACTION_COLUMNS}
      data={rows}
      defaultSortingKey="position"
      entityName={{ en: { singular: 'action', plural: 'actions' } }}
    >
      <Table.SingleSelectableContent
        rowHeight="h40"
        separationLineVariant="backgroundLevel3"
      />
    </Table>
  </div>
);

const SetupConfigureStep = () => {
  const { next } = useStepper(SetupStepIndexes.Configure, SETUP_STEPS);
  const [name, setName] = useState('analytics-archive');
  const [environment, setEnvironment] = useState('production');
  const [retention, setRetention] = useState(true);

  return (
    <Form
      layout={{ kind: 'page', title: 'Configure the integration' }}
      requireMode="partial"
      responsive
      leftActions={
        <Button type="button" variant="outline" label="Cancel" onClick={() => {}} />
      }
      rightActions={
        <Button
          type="button"
          variant="primary"
          label="Continue"
          icon={<Icon name="Arrow-right" />}
          onClick={() => next({ name, environment, retention })}
        />
      }
    >
      <FormSection
        title={{ name: 'Integration', icon: 'Node-backend' }}
        forceLabelWidth="14rem"
      >
        <FormGroup
          id="setup-name"
          label="Integration name"
          required
          content={
            <Input
              id="setup-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          }
        />
        <FormGroup
          id="setup-environment"
          label="Environment"
          required
          helpErrorPosition="bottom"
          content={
            <Select
              id="setup-environment"
              value={environment}
              onChange={(value) => setEnvironment(value)}
            >
              <Select.Option value="production">Production</Select.Option>
              <Select.Option value="staging">Staging</Select.Option>
              <Select.Option value="sandbox">Sandbox</Select.Option>
            </Select>
          }
        />
        <FormGroup
          id="setup-retention"
          label="Retention"
          content={
            <Toggle
              id="setup-retention"
              name="setup-retention"
              toggle={retention}
              onChange={() => setRetention(!retention)}
              label="Lock new data for 30 days"
            />
          }
        />
      </FormSection>
    </Form>
  );
};

const SetupApplyStep = (props: Record<string, unknown>) => {
  const { next } = useStepper(SetupStepIndexes.Apply, SETUP_STEPS);
  const { rows, allRequiredComplete, hasOptionalFailure } = useSetupActions();

  // Deliberately not wrapped in a Form: this is the step that takes its width
  // from the row rather than capping itself, which is the case the other two
  // steps cannot show.
  return (
    <Stack direction="vertical" gap="r16">
      <Text variant="Larger">Apply the actions</Text>
      <SetupActionsTable rows={rows} />
      {hasOptionalFailure && allRequiredComplete && (
        <Banner icon={<Icon name="Exclamation-circle" />} variant="warning">
          One optional action was unsuccessful. You can continue and configure it
          by hand later.
        </Banner>
      )}
      <Button
        type="button"
        variant="primary"
        label="Continue"
        icon={<Icon name="Arrow-right" />}
        disabled={!allRequiredComplete}
        onClick={() => next(props)}
      />
    </Stack>
  );
};

const SUMMARY_ENDPOINT = 'https://s3.example.net';
const SUMMARY_ACCESS_KEY = 'XR7K2D9QWMEV4TB1NZ8L';

const SummaryValue = ({ value, label }: { value: string; label: string }) => (
  <Stack gap="r8">
    <Text>{value}</Text>
    <CopyButton textToCopy={value} aria-label={label} />
  </Stack>
);

const SetupSummaryStep = ({
  name,
  environment,
}: {
  name?: string;
  environment?: string;
}) => {
  const { prev } = useStepper(SetupStepIndexes.Summary, SETUP_STEPS);

  return (
    <Form
      layout={{ kind: 'page', title: 'Summary' }}
      responsive
      leftActions={
        <Button
          type="button"
          variant="outline"
          label="Back"
          onClick={() => prev({})}
        />
      }
      rightActions={
        <Button type="button" variant="primary" label="Close" onClick={() => {}} />
      }
    >
      <FormSection title={{ name: 'Integration' }} forceLabelWidth="12rem">
        <FormGroup
          id="summary-name"
          label="Integration name"
          required
          content={<Text>{name ?? 'analytics-archive'}</Text>}
        />
        <FormGroup
          id="summary-environment"
          label="Environment"
          required
          content={<Text>{environment ?? 'production'}</Text>}
        />
      </FormSection>
      <FormSection title={{ name: 'Connection' }} forceLabelWidth="12rem">
        <Banner icon={<Icon name="Exclamation-circle" />} variant="warning">
          The secret key cannot be retrieved afterwards, so keep it now.
        </Banner>
        <FormGroup
          id="summary-endpoint"
          label="Service endpoint"
          required
          content={
            <SummaryValue value={SUMMARY_ENDPOINT} label="copy service endpoint" />
          }
        />
        <FormGroup
          id="summary-access-key"
          label="Access key"
          required
          content={
            <SummaryValue value={SUMMARY_ACCESS_KEY} label="copy access key" />
          }
        />
      </FormSection>
    </Form>
  );
};

enum SetupStepIndexes {
  Configure,
  Apply,
  Summary,
}

const SETUP_STEPS = [
  { label: 'Configure', Component: SetupConfigureStep },
  { label: 'Apply actions', Component: SetupApplyStep },
  { label: 'Summary', Component: SetupSummaryStep },
] as const;

export const GuidedSetup: Story = {
  name: 'Guided setup — form, actions, summary',
  render: () => <Stepper steps={SETUP_STEPS} />,
};
