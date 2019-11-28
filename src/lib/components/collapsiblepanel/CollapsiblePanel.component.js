//@flow
import React from "react";
import { lighten } from "polished";
import styled, { css } from "styled-components";
import Button from "../button/Button.component";
import { mergeTheme } from "../../utils";
import * as defaultTheme from "../../style/theme";

type Props = {
  expand?: Boolean,
  onHeaderClick?: any => void,
  onClick? : any => void,
  children?: Array,
  node?: String,
  variant? : string,
};

const ARROW = {
  colapsed: 'fas fa-angle-down',
  expanded: 'fas fa-angle-up',
}

const PanelText = styled.div`
`;

const CollapsiblePanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px 8px 4px 4px;

  ${props => {
    const brandingTheme = mergeTheme(props.theme, defaultTheme);

    return css`
        background-color: ${brandingTheme[props.variant]};
        color: ${brandingTheme.background};
      `;
    }
  }
`;


const HeaderContainer = styled.div`
  height: ${defaultTheme.navbarHeight};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${defaultTheme.padding.small} ${defaultTheme.padding.large}
`;

const ExpandedItems = styled.div`
  height: ${defaultTheme.navbarHeight};
  display: flex;
  align-items: center;
  padding: ${defaultTheme.padding.smaller} ${defaultTheme.padding.large};

  ${props => {
    const brandingTheme = mergeTheme(props.theme, defaultTheme);
    const brandLight = lighten(0.1,  brandingTheme[props.variant]).toString();
    return props.onClick
      && css`
        &:hover {
          cursor: pointer;
          background-color: ${brandLight};
        }
      `;
    }
  }
`;

const ExpandedContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

function CollapsiblePanel({
  expanded = false,
  variant =  'primary',
  onHeaderClick,
  onClick,
  children = [],
  node = '',
}: Props) {
  return (
    <CollapsiblePanelContainer className="sc-collapsiblepanel" variant={variant} >
      <HeaderContainer>
        <PanelText className="sc-chips-text">
          {node}
        </PanelText>
        <Button
          size="larger"
          variant={variant}
          onClick={onHeaderClick}
          icon={<i className={expanded ? ARROW.expanded : ARROW.colapsed} />}
        />
      </HeaderContainer>
      {
        expanded && (
          <ExpandedContainer>
            {
              children.map(item =>
                <ExpandedItems key={item} onClick={onClick} variant={variant}>
                  {item}
                </ExpandedItems>
              )
            }
          </ExpandedContainer>
        )
      }
    </CollapsiblePanelContainer>
  );
}

export default CollapsiblePanel;
