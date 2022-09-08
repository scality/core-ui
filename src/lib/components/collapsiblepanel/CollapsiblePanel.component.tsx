import styled from 'styled-components';
import * as defaultTheme from '../../style/theme';
import { mergeTheme } from '../../utils';
import { Icon } from '../icon/Icon.component';
type Props = {
  expanded: boolean;
  onHeaderClick: (arg0: any) => void;
  children: React.ReactNode;
  headerItems: Array<JSX.Element>;
};
const ARROW = {
  colapsed: 'fas fa-angle-down',
  expanded: 'fas fa-angle-up',
};
const HeaderText = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
`;
const HeaderItem = styled.div`
  margin-right: ${defaultTheme.padding.base};
  display: flex;
  flex-grow: 1;
`;
const HeaderIcon = styled.div`
  font-size: ${defaultTheme.fontSize.larger};
  margin: 0 ${defaultTheme.padding.base};
`;
const CollapsiblePanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  background-color: ${(props) =>
    mergeTheme(props.theme, defaultTheme).backgroundLevel1};
  color: ${(props) => mergeTheme(props.theme, defaultTheme).textPrimary};
`;
const HeaderContainer = styled.div`
  display: flex;
  cursor: pointer;
  padding: ${defaultTheme.padding.base};
`;
const ExpandedContainer = styled.div`
  padding: ${defaultTheme.padding.base};
  color: ${(props) => mergeTheme(props.theme, defaultTheme).textPrimary};
  background-color: ${(props) =>
    mergeTheme(props.theme, defaultTheme).backgroundLevel1};
`;

function CollapsiblePanel({
  expanded = false,
  onHeaderClick,
  children,
  headerItems = [],
}: Props) {
  return (
    <CollapsiblePanelContainer className="sc-collapsiblepanel">
      <HeaderContainer
        onClick={onHeaderClick}
        className="sc-collapsiblepanel-header"
      >
        <HeaderText>
          {headerItems.map((item, index) => (
            <HeaderItem key={index}>{item}</HeaderItem>
          ))}
        </HeaderText>
        <HeaderIcon>
          <Icon name={expanded ? 'Dropdown-up' : 'Dropdown-down'} />
        </HeaderIcon>
      </HeaderContainer>
      {expanded && (
        <ExpandedContainer className="sc-collapsiblepanel-content">
          {children}
        </ExpandedContainer>
      )}
    </CollapsiblePanelContainer>
  );
}

export { CollapsiblePanel };
