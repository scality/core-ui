import { ReactNode, useEffect, useLayoutEffect, useRef } from 'react';
import ReactDom from 'react-dom';
import styled from 'styled-components';
import { Wrap, spacing } from '../../spacing';
import { zIndex } from '../../style/theme';
import { getThemePropSelector } from '../../utils';
import { Button } from '../buttonv2/Buttonv2.component';
import { Icon } from '../icon/Icon.component';
import { Text } from '../text/Text.component';

type Props = {
  isOpen: boolean;
  close?: () => void;
  title: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  subTitle?: ReactNode;
  role?: 'dialog' | 'alertdialog';
};
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
  min-width: 250px;
  min-height: 150px;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
  max-height: calc(100vh - ${spacing.r24} - ${spacing.r24});
`;
const ModalHeader = styled.div`
  display: flex;
  padding: ${spacing.r16} ${spacing.r16} ${spacing.r16} ${spacing.r32};
  background-color: ${(props) => props.theme.backgroundLevel3};
`;

const ModalBody = styled.div`
  padding: ${spacing.r32};
  flex-grow: 1;
  background-color: ${(props) => props.theme.backgroundLevel4};
  overflow-y: auto;
`;
const ModalFooter = styled.div`
  padding: ${spacing.r16};
  background-color: ${(props) => props.theme.backgroundLevel3};
`;

const Modal = ({
  isOpen,
  close,
  title,
  children,
  footer,
  subTitle,
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
    ? ReactDom.createPortal(
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
            <ModalBody className="sc-modal-body" id="dialog_desc">
              {children}
            </ModalBody>
            {footer && (
              <ModalFooter className="sc-modal-footer">{footer}</ModalFooter>
            )}
          </ModalContent>
        </ModalContainer>,
        modalContainer.current,
      )
    : null;
};

export { Modal };
