import { ReactNode, useEffect, useId, useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styled, { css } from 'styled-components';
import { Wrap, spacing } from '../../spacing';
import { zIndex } from '../../style/theme';
import { getThemePropSelector } from '../../utils';
import { Button } from '../buttonv2/Buttonv2.component';
import { Icon, IconName } from '../icon/Icon.component';
import { Props as TooltipProps } from '../tooltip/Tooltip.component';
import { Text } from '../text/Text.component';

/** A single footer action. The Modal renders the button and owns its variant. */
export type ModalAction = {
  label: string;
  onClick: () => void;
  /** Icon name (the Modal renders the `<Icon />`), shown before the label. */
  icon?: IconName;
  disabled?: boolean;
  /** Tooltip, e.g. to explain why a disabled `confirm` can't be used yet. */
  tooltip?: Omit<TooltipProps, 'children'>;
};

/**
 * Structured footer actions. All actions are right-aligned: `confirm` is the
 * rightmost, `cancel` sits immediately to its left, and the optional neutral
 * `extra` sits left of `cancel`. Two actions is the norm; three is acceptable;
 * avoid four. The Modal fixes each button's variant so callers can't diverge
 * from the guideline.
 */
export type ModalActions = {
  /** Affirmative action, rendered rightmost. Defaults to the `primary` variant. */
  confirm: ModalAction & { variant?: 'primary' | 'danger' };
  /** Dismiss action, rendered with the `outline` variant. Label defaults to "Cancel". */
  cancel?: Omit<ModalAction, 'label'> & { label?: string };
  /** Optional neutral tertiary action, rendered with the `secondary` variant. */
  extra?: ModalAction;
};

type CommonProps = {
  isOpen: boolean;
  /**
   * Modal title — always a short text string that mirrors the verb of the
   * action that opened the modal (a "Delete node" button opens a modal
   * titled "Delete node?"). The string is used as the accessible name
   * (`aria-labelledby`); non-string content breaks screen-reader
   * announcement.
   */
  title:
    | string
    /**
     * @deprecated Pass a plain string. Non-string titles violate the modal
     * guideline (title is always text) and break the accessible name
     * (`aria-labelledby`); support will be removed in a future major release.
     */
    | Exclude<ReactNode, string>;
  children: ReactNode;
  subTitle?: ReactNode;
  /**
   * When true, the modal sizes to its content (up to 90vw) instead of
   * capping body content at 480px. Use for tables, complex forms, or any
   * content that needs more horizontal space.
   */
  wide?: boolean;
};

type WithLegacyFooter = {
  /**
   * Free-form footer content. Required on this branch — a modal must expose a
   * footer, so callers not using `actions` have to provide one here.
   *
   * @deprecated Use `actions` instead. `footer` accepts arbitrary content
   * and bypasses the documented stack/alignment guideline; it will be
   * removed in a future major release.
   */
  footer: ReactNode;
  actions?: never;
};

type WithActions = {
  footer?: never;
  /** Structured footer actions (preferred over `footer`). */
  actions: ModalActions;
};

/**
 * Every modal must have a footer, so exactly one strategy is required:
 * the structured `actions` prop (preferred) or the deprecated free-form
 * `footer`. Passing both, or neither, fails to type-check.
 */
type FooterProps = WithLegacyFooter | WithActions;

type DialogProps = CommonProps &
  FooterProps & {
    role?: 'dialog';
    close?: () => void;
  };

type AlertDialogProps = CommonProps &
  FooterProps & {
    role: 'alertdialog';
    close?: never;
  };

type Props = DialogProps | AlertDialogProps;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: ${zIndex.modal};
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${getThemePropSelector('backgroundLevel1')};
  color: ${getThemePropSelector('textPrimary')};
  border-radius: 5px;
  overflow: hidden;
  min-height: 150px;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
  max-height: calc(100vh - ${spacing.r24} - ${spacing.r24});
  max-width: 90vw;
`;

const ModalHeader = styled.div`
  display: flex;
  padding: ${spacing.r16} ${spacing.r16} ${spacing.r16} ${spacing.r32};
  background-color: ${(props) => props.theme.backgroundLevel3};
`;

const ModalBody = styled.div<{ $wide?: boolean }>`
  padding: ${spacing.r32};
  flex-grow: 1;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.backgroundLevel4};
  overflow-y: auto;
  ${({ $wide }) =>
    $wide
      ? css`
          min-width: min(480px, 90vw);
          overflow-x: auto;
        `
      : css`
          width: min(480px, 90vw);
          max-width: 100%;
        `}
`;

const ModalFooter = styled.div`
  padding: ${spacing.r16};
  background-color: ${(props) => props.theme.backgroundLevel3};
`;

const ActionsLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${spacing.r8};
`;

const ActionButton = ({
  action,
  variant,
}: {
  action: ModalAction;
  variant: 'primary' | 'danger' | 'outline' | 'secondary';
}) => (
  <Button
    label={action.label}
    variant={variant}
    icon={action.icon ? <Icon name={action.icon} /> : undefined}
    disabled={action.disabled}
    tooltip={action.tooltip}
    onClick={action.onClick}
  />
);

const Modal = ({
  isOpen,
  close,
  title,
  children,
  footer,
  actions,
  subTitle,
  wide,
  role = 'dialog',
  ...rest
}: Props) => {
  const modalContainer = useRef(document.createElement('div'));
  const labelId = useId();
  const descId = useId();

  // Host the portal only while open, and append rather than prepend: every
  // ModalContainer shares one z-index, so `<body>` order alone decides which
  // modal paints on top. Appending on open makes that the modal opened last;
  // gating on `isOpen` stops a mounted-but-closed modal from holding a place
  // in the stack it is not using.
  useLayoutEffect(() => {
    if (!isOpen) {
      return;
    }
    const host = modalContainer.current;
    document.body?.append(host);
    return () => {
      host.remove();
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      //Auto focus the modal when it opens
      modalContainer.current.setAttribute('tabindex', '0');
      modalContainer.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    //Listen to esc key to close the modal
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close?.();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, close]);

  return isOpen
    ? createPortal(
      <ModalContainer
        className="sc-modal"
        role={role}
        aria-modal="true"
        aria-labelledby={labelId}
        aria-describedby={descId}
        {...rest}
      >
        <ModalContent className="sc-modal-content">
          <ModalHeader className="sc-modal-header">
            <Wrap style={{ flex: 1 }}>
              <Text variant="Larger" id={labelId}>
                {title}
              </Text>
              {close ? (
                <Button
                  icon={<Icon name="Close" />}
                  onClick={close}
                  tooltip={{
                    overlay: 'Close modal',
                  }}
                />
              ) : (
                <>{subTitle}</>
              )}
            </Wrap>
          </ModalHeader>
          <ModalBody className="sc-modal-body" id={descId} $wide={wide}>
            {children}
          </ModalBody>
          {(actions || footer) && (
            <ModalFooter className="sc-modal-footer">
              {actions ? (
                <ActionsLayout>
                  {actions.extra && (
                    <ActionButton action={actions.extra} variant="secondary" />
                  )}
                  {actions.cancel && (
                    <ActionButton
                      action={{
                        ...actions.cancel,
                        label: actions.cancel.label ?? 'Cancel',
                      }}
                      variant="outline"
                    />
                  )}
                  <ActionButton
                    action={actions.confirm}
                    variant={actions.confirm.variant ?? 'primary'}
                  />
                </ActionsLayout>
              ) : (
                footer
              )}
            </ModalFooter>
          )}
        </ModalContent>
      </ModalContainer>,
      modalContainer.current,
    )
    : null;
};

export { Modal };
