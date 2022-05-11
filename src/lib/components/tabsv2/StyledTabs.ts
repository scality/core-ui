// @ts-nocheck
import styled from 'styled-components';
import { spacing } from '../../style/theme';
import { getTheme, getThemePropSelector } from '../../utils';
export const TabBar = styled.div`
  display: flex;
  height: ${spacing.sp40};
`;
export const TabItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0 ${spacing.sp24} 0 ${spacing.sp24};
  border-radius: ${spacing.sp4} ${spacing.sp4} 0 0;
  border: ${spacing.sp1} solid transparent;
  min-width: 5rem;

  &:focus-visible {
    outline: 0;
    position: relative;
    border: ${spacing.sp1} dashed ${getThemePropSelector('selectedActive')};
  }

  &:focus-within {
    outline: 0;
  }

  ${(props) => {
    const { highlight, backgroundLevel3, backgroundLevel4, selectedActive } =
      getTheme(props);
    return props.selected
      ? `
        background-color: ${props.activeTabColor || backgroundLevel4};
        &:after {
          content: "";
          background: ${props.activeTabSeparator || selectedActive};
          position: absolute;
          border-radius: ${spacing.sp2} ${spacing.sp2} 0 0;
          bottom: 0;
          right: 0;
          left: calc(50% - ${spacing.sp16});
          height: ${spacing.sp2};
          width: ${spacing.sp32};
        }
      `
      : `
        background-color: ${props.inactiveTabColor || backgroundLevel3};
        &:hover {
          cursor: pointer;
          border: ${spacing.sp1} solid ${props.tabHoverColor || highlight};;
        }
      `;
  }}
`;
export const TabsContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${(props) =>
    props.tabLineColor || getTheme(props).backgroundLevel3};

  & ${TabItem} {
    display: flex;
    justify-content: center;
    position: relative;
  }

  & ${TabItem}::before {
    content: "";
    background: ${(props) =>
      props.separatorColor || getTheme(props).infoSecondary};
    position: absolute;
    bottom: 25%;
    right: 0;
    height: ${spacing.sp16};
    width: 1px;
    margin-right: -1px;
  }
}`;
export const TabContent = styled.div`
  margin: 0;
  padding: 0;
  flex: 1;
  background-color: ${(props) =>
    props.tabContentColor || getTheme(props).backgroundLevel4};
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
