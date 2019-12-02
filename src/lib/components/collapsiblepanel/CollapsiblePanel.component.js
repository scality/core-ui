//@flow
import React from "react";
import { mergeTheme } from "../../utils";
import styled from "styled-components";
import * as defaultTheme from "../../style/theme";

type Props = {
  expand: Boolean,
  onHeaderClick: any => void,
  children: any,
  header: Array,
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
  font-size: 18px
  margin: 0 20px;
`;

const CollapsiblePanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  background-color: ${props => mergeTheme(props.theme, defaultTheme).backgroundContrast1};
  color: ${props => mergeTheme(props.theme, defaultTheme).text};;
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
  header = [],
}: Props) {
  return (
    <CollapsiblePanelContainer className="sc-collapsiblepanel" >
      <HeaderContainer onClick={onHeaderClick} className="sc-collapsiblepanel-header">
        <HeaderText>
          {
            header.map(item =>
              <HeaderItem key={item} >{item}</HeaderItem>
            )
          }
        </HeaderText>
        <HeaderIcon>
          <i className={expanded ? ARROW.expanded : ARROW.colapsed} />
        </HeaderIcon>
      </HeaderContainer>
      {
        expanded && (
          <ExpandedContainer className="sc-collapsiblepanel-content">
            {children}
          </ExpandedContainer>
        )
      }
    </CollapsiblePanelContainer>
  );
}

export default CollapsiblePanel;
