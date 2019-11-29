//@flow
import React from "react";
import styled from "styled-components";
import Button from "../button/Button.component";
import * as defaultTheme from "../../style/theme";


type Props = {
  expand?: Boolean,
  onHeaderClick?: any => void,
  children?: any,
  node: Array,
};

const ARROW = {
  colapsed: 'fas fa-angle-down',
  expanded: 'fas fa-angle-up',
}

const HeaderText = styled.div`
  display: flex;
`;

const HeaderItem = styled.div`
  margin-right: 20px; 
`;
const HeaderIcon = styled.div`
  margin: 0 20px;
`;

const CollapsiblePanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px 8px 4px 4px;
  background-color: ${defaultTheme.brand.primary};
  color: ${defaultTheme.brand.backgroundContrast1};
`;

const HeaderContainer = styled.div`
  height: ${defaultTheme.navbarHeight};
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer
  padding: ${defaultTheme.padding.small} ${defaultTheme.padding.large}
`;

const ExpandedContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${defaultTheme.padding.small} ${defaultTheme.padding.large}
`;

function CollapsiblePanel({
  expanded = false,
  onHeaderClick,
  children,
  node = [],
}: Props) {
  return (
    <CollapsiblePanelContainer className="sc-collapsiblepanel" >
      <HeaderContainer onClick={onHeaderClick}>
        <HeaderText className="sc-chips-text" >
          {
            node.map(item =>
              <HeaderItem>{item}</HeaderItem>
            )
          }
        </HeaderText>
        <HeaderIcon>
          <Button
            icon={<i className={expanded ? ARROW.expanded : ARROW.colapsed} />}
            size="larger"
          />
        </HeaderIcon>
      </HeaderContainer>
      {
        expanded && (
          <ExpandedContainer>
            {children}
          </ExpandedContainer>
        )
      }
    </CollapsiblePanelContainer>
  );
}

export default CollapsiblePanel;
