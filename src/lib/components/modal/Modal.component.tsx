import { ReactNode, useEffect, useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styled, { css } from 'styled-components';
import { Wrap, spacing } from '../../spacing';
import { zIndex } from '../../style/theme';
import { getThemePropSelector } from '../../utils';
import { Button } from '../buttonv2/Buttonv2.component';
import { Icon } from '../icon/Icon.component';
import { Text } from '../text/Text.component';

/**
 * Structured footer actions, rendered with the canonical stack and
 * alignment (extra left-aligned, secondary + primary right-aligned with
 * primary as the rightmost action).
 */
export type ModalActions = {
  primary: ReactNode;
  secondary?: ReactNode;
  extra?: ReactNode;
};

type CommonProps = {
  isOpen: boolean;
  /**
   * Modal title.
   *
   * Pass a plain string — the title is used as the accessible name
   * (`aria-labelledby`); non-string content breaks screen reader
   * announcement.
   *
   * @deprecated Passing a `ReactNode` is kept for backward compatibility
   * and will be removed in a future major release. Use a plain string.
   */
  title: string | ReactNode;
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
   * Free-form footer content.
   *
   * @deprecated Use `actions` instead. `footer` accepts arbitrary content
   * and bypasses the documented stack/alignment guideline; it will be
   * removed in a future major release.
   */
  footer?: ReactNode;
  actions?: never;
};

type WithActions = {
  footer?: never;
  /** Structured footer actions (preferred over `footer`). */
  actions: ModalActions;
};

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
  gap: ${spacing.r8};
`;

const ActionsExtra = styled.div`
  margin-right: auto;
`;

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

  useLayoutEffect(() => {
    document.body && document.body.prepend(modalContainer.current);
    return () => {
      document.body && document.body.removeChild(modalContainer.current);
    };
  }, [modalContainer]);

  useEffect(() => {
    if (isOpen) {
      //Auto focus the modal when it opens
      modalContainer.current.setAttribute('tabindex', '0');
      modalContainer.current.focus();
      //Listen to esc key to close the modal
      const handleEsc = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          close && close();
        }
      };
      document.addEventListener('keydown', handleEsc);
      return () => {
        document.removeEventListener('keydown', handleEsc);
      };
    }
  }, [isOpen]);

  return isOpen
    ? createPortal(
      <ModalContainer
        className="sc-modal"
        role={role}
        aria-modal="true"
        aria-labelledby="dialog_label"
        aria-describedby="dialog_desc"
        {...rest}
      >
        <ModalContent className="sc-modal-content">
          <ModalHeader className="sc-modal-header">
            <Wrap style={{ flex: 1 }}>
              <Text variant="Larger" id="dialog_label">
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
          <ModalBody className="sc-modal-body" id="dialog_desc" $wide={wide}>
            {children}
          </ModalBody>
          {(actions || footer) && (
            <ModalFooter className="sc-modal-footer">
              {actions ? (
                <ActionsLayout>
                  {actions.extra && <ActionsExtra>{actions.extra}</ActionsExtra>}
                  {actions.secondary}
                  {actions.primary}
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
