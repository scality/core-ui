import styled from 'styled-components';
import { getTheme } from '../../utils';
import { spacing } from '../../style/theme.js';

export const SortIncentive = styled.span`
  position: absolute;
  display: none;
`;

export const SortCaretWrapper = styled.span`
  padding-left: ${spacing.sp4};
  position: absolute;
`;

export const TableHeader = styled.div`
  padding-bottom: ${spacing.sp16};
  height: ${(props) => props.headerHeight};
  &:hover {
    ${SortIncentive} {
      display: block;
    }
  }
`;

export const HeadRow = styled.div`
  height: 2.286rem;
  width: 100%;
  display: flex;
  table-layout: fixed;
  cursor: pointer;
  color: ${(props) => getTheme(props).textTertiary};
  font-weight: bold;
`;

export const TableRow = styled.div`
  color: ${(props) => getTheme(props).textTertiary};
  border-top: 1px solid
    ${(props) => getTheme(props)[props.separationLineVariant]};
  :last-child {
    border-bottom: 1px solid
      ${(props) => getTheme(props)[props.separationLineVariant]};
  }
  cursor: default;
`;

export const TableBody = styled.div`
  display: block;
  flex-grow: 1;
`;

export const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
