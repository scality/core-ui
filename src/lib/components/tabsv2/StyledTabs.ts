import styled from 'styled-components';
import { spacing } from '../../spacing';

export const TabBar = styled.div`
  display: flex;
  height: ${spacing.r40};
`;
export const TabItem = styled.div<{
  selected?: boolean;
  activeTabColor?: string;
  activeTabSeparator?: string;
  inactiveTabColor?: string;
  tabHoverColor?: string;
}>`
  display: flex;
  align-items: center;
  padding: 0 ${spacing.r24} 0 ${spacing.r24};
  border-radius: ${spacing.r4} ${spacing.r4} 0 0;
  border: ${spacing.r1} solid transparent;
  min-width: 5rem;

  &:focus-visible {
    outline: 0;
    position: relative;
    border: ${spacing.r1} dashed ${(props) => props.theme.selectedActive};
  }

  &:focus-within {
    outline: 0;
  }

  ${(props) => {
    const { highlight, backgroundLevel3, backgroundLevel4, selectedActive } =
      props.theme;
    return props.selected
      ? `
        background-color: ${props.activeTabColor || backgroundLevel4};
        &:after {
          content: "";
          background: ${props.activeTabSeparator || selectedActive};
          position: absolute;
          border-radius: ${spacing.r2} ${spacing.r2} 0 0;
          bottom: 0;
          right: 0;
          left: calc(50% - ${spacing.r16});
          height: ${spacing.r2};
          width: ${spacing.r32};
        }
      `
      : `
        background-color: ${props.inactiveTabColor || backgroundLevel3};
        &:hover {
          cursor: pointer;
          border: ${spacing.r1} solid ${props.tabHoverColor || highlight};
        }
      `;
  }}
`;
export const TabsContainer = styled.div<{
  tabLineColor?: string;
  separatorColor: string;
}>`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${(props) =>
    props.tabLineColor || props.theme.backgroundLevel3};

  & ${TabItem} {
    display: flex;
    justify-content: center;
    position: relative;
  }

  & ${TabItem}::before {
    content: '';
    background: ${(props) => props.separatorColor || props.theme.infoSecondary};
    position: absolute;
    bottom: 25%;
    right: 0;
    height: ${spacing.r16};
    width: 1px;
    margin-right: -1px;
  }
`;
export const TabContent = styled.div<{
  tabContentColor?: string;
  withoutPadding?: boolean;
}>`
  margin: 0;
  padding: ${(props) => (props.withoutPadding ? '0' : spacing.r16)};
  display: block;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  background-color: ${(props) =>
    props.tabContentColor || props.theme.backgroundLevel4};
`;
export const ScrollableContainer = styled.div`
  display: flex;
`;
export const TabsScroller = styled.div`
  position: relative;
  display: inline-flex;
  flex: 1 1 auto;
  white-space: nowrap;
  width: 100%;
  scrollbar-width: none; // Firefox
  &::-webkit-scrollbar {
    display: none; // Safari + Chrome
  }
  overflow-x: auto;
  overflow-y: hidden;
`;
