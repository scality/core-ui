import React from 'react';
import styled from 'styled-components';
import { useMutation } from 'react-query';
import { InlineInput } from '../../src/lib';
import { Button } from '../../src/lib/components/buttonv2/Buttonv2.component';
import { Modal } from '../../src/lib/components/modal/Modal.component';
import { Stack, spacing } from '../../src/lib/spacing';

const InfoLabel = styled.span`
  display: inline-block;
  min-width: 10.714rem;
  color: ${(props) => props.theme.textSecondary};
`;
const InfoRow = styled.div`
  padding-bottom: ${spacing.r20};
  padding-left: ${spacing.r20};
  display: flex;
  align-items: center;
`;
const InfoValue = styled.span`
  color: ${(props) => props.theme.textPrimary};
  padding-left: 0.313rem;
`;

const LabelValueLayout = ({ children }: { children: React.ReactNode }) => (
  <div>
    <InfoRow>
      <InfoLabel>Node ID</InfoLabel>
      <InfoValue>node-abc-123</InfoValue>
    </InfoRow>
    <InfoRow>
      <InfoLabel>Display Name</InfoLabel>
      {children}
    </InfoRow>
    <InfoRow>
      <InfoLabel>Name</InfoLabel>
      <InfoValue>node-name-2</InfoValue>
    </InfoRow>
    <InfoRow>
      <InfoLabel>Control Plane IP</InfoLabel>
      <InfoValue>10.0.0.12</InfoValue>
    </InfoRow>
    <InfoRow>
      <InfoLabel>Roles</InfoLabel>
      <InfoValue>worker</InfoValue>
    </InfoRow>
  </div>
);

const useFakeMutation = ({ delay = 1500 }: { delay?: number } = {}) =>
  useMutation<unknown, unknown, { value: string }>({
    mutationFn: ({ value }) => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(value), delay);
      });
    },
  });

const useFailingMutation = () =>
  useMutation<unknown, Error, { value: string }>({
    mutationFn: () => {
      return new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Something went wrong')), 800);
      });
    },
  });

export default {
  title: 'Components/InlineInput',
  component: InlineInput,
  args: {
    id: 'instanceName',
    defaultValue: 'My instance',
  },
  argTypes: {
    changeMutation: { table: { disable: true } },
    confirmationModal: { table: { disable: true } },
    check: { table: { disable: true } },
  },
  decorators: [
    (Story: React.ComponentType) => (
      <LabelValueLayout>
        <Story />
      </LabelValueLayout>
    ),
  ],
};

export const Default = {
  render: (args: React.ComponentProps<typeof InlineInput>) => {
    const changeMutation = useFakeMutation();
    return <InlineInput {...args} changeMutation={changeMutation} />;
  },
};

export const Editing = {
  render: (args: React.ComponentProps<typeof InlineInput>) => {
    const changeMutation = useFakeMutation();
    return <InlineInput {...args} changeMutation={changeMutation} />;
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const trigger = canvasElement.querySelector<HTMLElement>(
      '[role="button"][aria-label="Edit"]',
    );
    trigger?.click();
  },
};

export const WithValidation = {
  render: (args: React.ComponentProps<typeof InlineInput>) => {
    const changeMutation = useFakeMutation();
    return (
      <InlineInput
        {...args}
        changeMutation={changeMutation}
        check={(value) => {
          if (value.trim().length < 3) {
            return {
              hasError: true,
              message: 'Name must be at least 3 characters',
            };
          }
          if (!/^[a-zA-Z0-9-]+$/.test(value.trim())) {
            return {
              hasError: true,
              message: 'Only letters, digits and dashes are allowed',
            };
          }
          return { hasError: false };
        }}
      />
    );
  },
};

export const WithFloatingError = {
  render: (args: React.ComponentProps<typeof InlineInput>) => {
    const changeMutation = useFakeMutation();
    return (
      <InlineInput
        {...args}
        changeMutation={changeMutation}
        helperTextPlacement="bottom"
        check={(value) => {
          if (value.trim().length < 3) {
            return {
              hasError: true,
              message: 'Name must be at least 3 characters',
            };
          }
          if (!/^[a-zA-Z0-9-]+$/.test(value.trim())) {
            return {
              hasError: true,
              message: 'Only letters, digits and dashes are allowed',
            };
          }
          return { hasError: false };
        }}
      />
    );
  },
};


export const Loading = {
  render: (args: React.ComponentProps<typeof InlineInput>) => {
    // Force a long-running mutation that's pre-triggered when the story mounts.
    const changeMutation = useFakeMutation({ delay: 60_000 });
    React.useEffect(() => {
      changeMutation.mutate({ value: 'My instance' });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <InlineInput {...args} changeMutation={changeMutation} />;
  },
};

export const WithConfirmationModal = {
  render: (args: React.ComponentProps<typeof InlineInput>) => {
    const changeMutation = useFakeMutation();
    return (
      <InlineInput
        {...args}
        changeMutation={changeMutation}
        confirmationModal={({
          isOpen,
          pendingValue,
          currentValue,
          onConfirm,
          onCancel,
          isLoading,
        }) => (
          <Modal
            isOpen={isOpen}
            close={onCancel}
            title="Rename instance?"
            footer={
              <Stack direction="horizontal" gap="r8">
                <Button variant="outline" label="Cancel" onClick={onCancel} />
                <Button
                  variant="primary"
                  label="Rename"
                  onClick={onConfirm}
                  isLoading={isLoading}
                />
              </Stack>
            }
          >
            Rename <strong>{currentValue}</strong> to{' '}
            <strong>{pendingValue}</strong>?
          </Modal>
        )}
      />
    );
  },
};

export const WithMutationError = {
  render: (args: React.ComponentProps<typeof InlineInput>) => {
    const changeMutation = useFailingMutation();
    return (
      <InlineInput
        {...args}
        changeMutation={changeMutation}
        confirmationModal={({
          isOpen,
          pendingValue,
          onConfirm,
          onCancel,
          isLoading,
          error,
        }) => (
          <Modal
            isOpen={isOpen}
            close={onCancel}
            title="Rename instance?"
            footer={
              <Stack direction="horizontal" gap="r8">
                <Button variant="outline" label="Cancel" onClick={onCancel} />
                <Button
                  variant="primary"
                  label="Rename"
                  onClick={onConfirm}
                  isLoading={isLoading}
                />
              </Stack>
            }
          >
            <Stack direction="vertical" gap="r8">
              {error instanceof Error && (
                <span style={{ color: 'red' }}>{error.message}</span>
              )}
              <span>
                Rename to <strong>{pendingValue}</strong>?
              </span>
            </Stack>
          </Modal>
        )}
      />
    );
  },
};
