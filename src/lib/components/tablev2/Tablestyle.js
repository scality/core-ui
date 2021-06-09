import styled from 'styled-components';
import { getTheme } from '../../utils';

export const SortIncentive = styled.span`
  position: absolute;
  display: none;
`;

export const TableHeader = styled.div`
  padding-bottom: 14px;
  &:hover {
    ${SortIncentive} {
      display: block;
    }
  }
`;

// adapt the Styles with the design
export const Styles = styled.div`
  padding: 1rem;
  table {
    border-spacing: 0;
    border: 1px solid black;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      :last-child {
        border-right: 0;
      }
    }
  }
  color: white;
`;

export const HeadRow = styled.div`
  width: 100%;
  /* To display scroll bar on the table */
  display: table;
  table-layout: fixed;
  border-bottom: 1px solid ${(props) => getTheme(props).backgroundLevel1};
`;

export const TableRow = styled(HeadRow)`
  box-sizing: border-box;

  &:hover,
  &:focus {
    background-color: ${(props) => getTheme(props).highlight};
    outline: none;
    cursor: pointer;
  }

  border-right: 4px solid
    ${(props) =>
      props.defaultSelectedValue ===
      props.row.values[`${props.defaultSelectedKey}`]
        ? getTheme(props).selectedActive
        : getTheme(props).backgroundLevel2};
  background-color: ${(props) =>
    props.defaultSelectedValue ===
    props.row.values[`${props.defaultSelectedKey}`]
      ? getTheme(props).highlight
      : getTheme(props).backgroundLevel2};
`;

export const TableBody = styled.div`
  display: block;
  height: calc(100vh - 48px);
`;
