import styled from 'styled-components';

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
