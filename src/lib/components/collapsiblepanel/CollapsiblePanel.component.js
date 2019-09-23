//@flow
import React from "react";
import type { Node } from "react";
import styled from "styled-components";

type Props = {
  header: Array<Node>,
  children: Node,
  open: boolean,
  onHeaderClick: any => void
};

const CollapsiblePanelContainer = styled.div``;
const CollapsiblePanelHeader = styled.div`
  display: flex;
`;
const CollapsiblePanelContent = styled.div``;
const CollapsiblePanelHeaderIcon = styled.div``;
const CollapsiblePanelHeaderContent = styled.div``;
const CollapsiblePanelHeaderCell = styled.div``;

function CollapsiblePanel({ header, onHeaderClick, open, children }: Props) {
  return (
    <CollapsiblePanelContainer className="sc-collapsiblepanel">
      <CollapsiblePanelHeader
        className="sc-collapsiblepanel-header"
        onClick={onHeaderClick}
      >
        <CollapsiblePanelHeaderContent>
          {header.map((column, index) => (
            <CollapsiblePanelHeaderCell
              key={`CollapsiblePanelHeaderCell_${index}`}
            >
              {column}
            </CollapsiblePanelHeaderCell>
          ))}
        </CollapsiblePanelHeaderContent>
        <CollapsiblePanelHeaderIcon>
          {open ? (
            <i className="fas fa-caret-up"></i>
          ) : (
            <i className="fas fa-caret-down"></i>
          )}
        </CollapsiblePanelHeaderIcon>
      </CollapsiblePanelHeader>
      {open && (
        <CollapsiblePanelContent className="sc-collapsiblepanel-content">
          {children}
        </CollapsiblePanelContent>
      )}
    </CollapsiblePanelContainer>
  );
}

export default CollapsiblePanel;
