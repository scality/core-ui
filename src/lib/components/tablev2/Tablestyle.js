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
  height: 32px;
  width: 100%;
  display: table;
  table-layout: fixed;
  border-bottom: 1px solid
    ${(props) => getTheme(props)[props.separationLineVariant]};
  cursor: pointer;
  color: ${(props) => getTheme(props).textTertiary};
  font-weight: bold;
`;

export const TableRow = styled.div`
  border-bottom: 1px solid
    ${(props) => getTheme(props)[props.separationLineVariant]};
  color: ${(props) => getTheme(props).textTertiary};
  cursor: default;
`;

export const TableBody = styled.div`
  display: block;
  --variable-height: ${(props) => props.outerTableHeight}px;
  height: calc(100vh - var(--variable-height));
`;
