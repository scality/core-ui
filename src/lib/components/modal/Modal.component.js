//@flow
import React from "react";
import styled from "styled-components";
import * as defaultTheme from "../../style/theme";
import type { Node } from "react";

type Props = {
  isOpen: boolean,
  close: () => {},
  title: string,
  footer?: Node,
  children: Node
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
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${defaultTheme.white};
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
  background-color: ${defaultTheme.grayLightest};
`;

const ModalClose = styled.div`
  font-size: ${defaultTheme.fontSize.large};
  cursor: pointer;
  &:hover {
    color: ${defaultTheme.grayLight};
  }
`;

const Modal = ({ isOpen, close, title, children, footer, ...rest }: Props) => {
  return isOpen ? (
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
    </ModalContainer>
  ) : null;
};

export default Modal;
