import { ReactNode, useEffect, useRef } from 'react';
import ReactDom from 'react-dom';
import styled from 'styled-components';
import { spacing, Wrap } from '../../spacing';
import * as defaultTheme from '../../style/theme';
import { getTheme, getThemePropSelector } from '../../utils';
import { Button } from '../buttonv2/Buttonv2.component';
import { Icon } from '../icon/Icon.component';
import { Text } from '../text/Text.component';

type Props = {
  isOpen: boolean;
  close?: () => void;
  title: string;
  footer?: ReactNode;
  children: ReactNode;
  subTitle?: ReactNode;
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
  z-index: ${defaultTheme.zIndex.modal};
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
`;
const ModalHeader = styled.div`
  display: flex;
  padding: ${spacing.r16};
  background-color: ${(props) => getTheme(props).backgroundLevel3};
`;

const ModalBody = styled.div`
  padding: ${spacing.r32};
  flex-grow: 1;
  background-color: ${(props) => getTheme(props).backgroundLevel4};
`;
const ModalFooter = styled.div`
  padding: ${spacing.r16};
  background-color: ${(props) => getTheme(props).backgroundLevel3};
`;

const Modal = ({
  isOpen,
  close,
  title,
  children,
  footer,
  subTitle,
  ...rest
}: Props) => {
  const modalContainer = useRef(document.createElement('div'));

  useEffect(() => {
    document.body && document.body.prepend(modalContainer.current);
    return () => {
      document.body && document.body.removeChild(modalContainer.current);
    };
  }, [modalContainer]);
  return isOpen
    ? ReactDom.createPortal(
        <ModalContainer className="sc-modal" {...rest}>
          <ModalContent className="sc-modal-content">
            <ModalHeader className="sc-modal-header">
              <Wrap style={{ flex: 1 }}>
                <Text variant="Larger">{title}</Text>
                {close ? (
                  <Button icon={<Icon name="Close" />} onClick={close} />
                ) : (
                  <>{subTitle}</>
                )}
              </Wrap>
            </ModalHeader>
            <ModalBody className="sc-modal-body">{children}</ModalBody>
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
