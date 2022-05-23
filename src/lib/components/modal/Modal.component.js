//@flow
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import * as defaultTheme from '../../style/theme';
import type { Node } from 'react';
import { getThemePropSelector } from '../../utils';
import ReactDom from 'react-dom';

type Props = {
  isOpen: boolean,
  close: () => {},
  title: string,
  footer?: Node,
  children: Node,
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
  padding: ${defaultTheme.padding.base} ${defaultTheme.padding.larger};
`;
const ModalHeaderTitle = styled.span`
  font-size: ${defaultTheme.fontSize.large};
  font-weight: ${defaultTheme.fontWeight.semibold};
  flex-grow: 1;
`;
const ModalBody = styled.div`
  padding: 0 ${defaultTheme.padding.larger};
  flex-grow: 1;
`;
const ModalFooter = styled.div`
  padding: ${defaultTheme.padding.base} ${defaultTheme.padding.larger};
  background-color: ${getThemePropSelector('backgroundLevel4')};
`;

const ModalClose = styled.div`
  font-size: ${defaultTheme.fontSize.large};
  cursor: pointer;
  &:hover {
    color: ${defaultTheme.grayLight};
  }
`;

const Modal = ({ isOpen, close, title, children, footer, ...rest }: Props) => {
  const modalContainer = useRef(document.createElement('div'));

  useEffect(() => {
    document.body && document.body.appendChild(modalContainer.current);
    return () => {
      document.body && document.body.removeChild(modalContainer.current);
    };
  }, [modalContainer]);

  return isOpen
    ? ReactDom.createPortal(
        <ModalContainer className="sc-modal" {...rest}>
          <ModalContent className="sc-modal-content">
            <ModalHeader className="sc-modal-header">
              <ModalHeaderTitle>{title}</ModalHeaderTitle>
              <ModalClose onClick={close}>
                <i className="fas fa-times" />
              </ModalClose>
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

export default Modal;
