import {
  KeyboardEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { UseMutationResult } from 'react-query';
import { spacing, Stack } from '../../spacing';
import { Input, InputProps } from '../inputv2/inputv2';
import { Loader } from '../loader/Loader.component';
import { HelperText } from '../text/Text.component';
import { useToast } from '../toast/ToastProvider';
import { Tooltip } from '../tooltip/Tooltip.component';

type InlineInputForm = { value: string };

type CheckResult =
  | { hasError: true; message: string }
  | { hasError: false };

type ConfirmationModalRenderArgs = {
  isOpen: boolean;
  pendingValue: string;
  currentValue: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
  error: unknown;
};

export type InlineInputProps = {
  defaultValue?: string;
  changeMutation: UseMutationResult<unknown, unknown, InlineInputForm, unknown>;
  check?: (value: string) => CheckResult;
  confirmationModal?: (args: ConfirmationModalRenderArgs) => ReactNode;
  editTooltip?: string;
  loadingTooltip?: string;
  helperTextPlacement?: 'bottom' | 'right';
} & Omit<InputProps, 'defaultValue' | 'error' | 'value' | 'onChange'>;

const NameTrigger = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${spacing.r4};
  box-sizing: border-box;
  height: ${spacing.r32};
  padding: 0 ${spacing.r8};
  border-radius: ${spacing.r16};
  border: 1px solid ${(props) => props.theme.border};
  background: transparent;
  color: ${(props) => props.theme.textPrimary};
  font-family: 'Lato';
  font-size: 1rem;
  white-space: nowrap;
  cursor: pointer;
  transition: border-color 0.15s ease, background 0.15s ease, opacity 0.15s ease;

  &:focus-visible {
    outline: none;
    border-color: ${(props) => props.theme.infoPrimary};
  }

  &[data-disabled='true'] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:not([data-disabled='true']):hover {
    transition-delay: 150ms;
    border-color: ${(props) => props.theme.infoPrimary};
    background: ${(props) => props.theme.highlight};
  }
`;

const InlineLoaderWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  svg {
    width: 1em;
    height: 1em;
  }
`;

const FloatingErrorWrapper = styled.span`
  position: relative;
  display: inline-flex;
`;

const FloatingErrorContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  margin: 0;
  padding: 0 ${spacing.r8};
  white-space: nowrap;
  z-index: 1;
`;

export const InlineInput = ({
  defaultValue = '',
  changeMutation,
  check,
  confirmationModal,
  editTooltip = 'Edit',
  loadingTooltip = 'Saving…',
  helperTextPlacement = 'right',
  id,
  ...inputProps
}: InlineInputProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [pendingValue, setPendingValue] = useState(defaultValue);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  const isLoading = changeMutation.isLoading;
  const validation = check ? check(pendingValue) : ({ hasError: false } as const);
  const validationError = validation.hasError ? validation.message : undefined;

  useEffect(() => {
    if (isEditing) {
      setPendingValue(defaultValue);
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing, defaultValue]);

  const closeAndReset = () => {
    setIsEditing(false);
    setPendingValue(defaultValue);
  };

  const commit = (value: string) => {
    changeMutation.mutate(
      { value },
      {
        onSuccess: () => {
          setIsModalOpen(false);
          setIsEditing(false);
        },
        onError: () => {
          showToast({
            open: true,
            status: 'error',
            message: 'An error occurred while updating the value',
          });
        },
      },
    );
  };

  const submit = () => {
    if (validationError) {
      return;
    }

    const trimmed = pendingValue.trim();

    if (trimmed === defaultValue.trim()) {
      closeAndReset();
      return;
    }

    if (confirmationModal) {
      setIsEditing(false);
      setIsModalOpen(true);
      return;
    }

    commit(trimmed);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      submit();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      closeAndReset();
    }
  };

  const handleEditStart = () => {
    if (isLoading || isModalOpen) {
      return;
    }
    setIsEditing(true);
  };

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleEditStart();
    }
  };

  const modalNode =
    confirmationModal &&
    confirmationModal({
      isOpen: isModalOpen,
      pendingValue: pendingValue.trim(),
      currentValue: defaultValue,
      onConfirm: () => commit(pendingValue.trim()),
      onCancel: () => {
        setIsModalOpen(false);
      },
      isLoading,
      error: changeMutation.error,
    });

  if (isEditing) {
    const inputNode = (
      <Input
        {...inputProps}
        id={id}
        ref={inputRef}
        size="2/3"
        value={pendingValue}
        error={validationError}
        aria-describedby={validationError ? `${id}-error` : undefined}
        onChange={(e) => setPendingValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          if (!isLoading) submit();
        }}
      />
    );
    const editingContent =
      helperTextPlacement === 'bottom' ? (
        <FloatingErrorWrapper>
          {inputNode}
          {validationError && (
            <FloatingErrorContainer id={`${id}-error`} role="alert">
              <HelperText color="statusCritical">{validationError}</HelperText>
            </FloatingErrorContainer>
          )}
        </FloatingErrorWrapper>
      ) : (
        <Stack direction="horizontal" gap="r8">
          {inputNode}
          {validationError && (
            <HelperText id={`${id}-error`} color="statusCritical">
              {validationError}
            </HelperText>
          )}
        </Stack>
      );
    return (
      <>
        {editingContent}
        {modalNode}
      </>
    );
  }

  return (
    <>
      <Tooltip
        placement="bottom"
        overlay={isLoading ? loadingTooltip : editTooltip}
      >
        <NameTrigger
          data-disabled={isLoading || isModalOpen ? 'true' : undefined}
          role={isLoading ? undefined : 'button'}
          tabIndex={isLoading ? -1 : 0}
          aria-label={editTooltip}
          onClick={handleEditStart}
          onKeyDown={handleTriggerKeyDown}
        >
          {isModalOpen ? pendingValue.trim() : defaultValue}
          {isLoading && (
            <InlineLoaderWrapper>
              <Loader size="smaller" />
            </InlineLoaderWrapper>
          )}
        </NameTrigger>
      </Tooltip>
      {modalNode}
    </>
  );
};
