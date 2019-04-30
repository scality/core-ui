//@flow
import React from "react";
import styled, { css } from "styled-components";
import "react-virtualized/styles.css";
import Color from "color";
import * as defaultTheme from "../../style/theme";
import { mergeTheme } from "../../utils";
import Dropdown from "../dropdown/Dropdown.component";
import {
  Column,
  Table as VirtualizedTable,
  AutoSizer
} from "react-virtualized";

type Item = {
  label: string,
  onClick: () => void
};

export type Props = {
  list: Array<any>,
  columns: Array<any>,
  disableHeader: boolean,
  headerHeight: number,
  onHeaderClick: () => void,
  onRowClick: () => void,
  overscanRowCount: number,
  rowHeight: number,
  onSort: () => void,
  sortBy: string,
  sortDirection: string
};

type HeaderProps = {
  dataKey: string,
  label: string,
  sortBy: string,
  sortDirection: string,
  disableSort: boolean
};

const TableContainer = styled.div`
  .ReactVirtualized__Table__Grid {
    &:focus {
      outline: none;
    }
    .sc-table-noRows {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      font-size: ${defaultTheme.fontSize.large};
    }
  }

  .ReactVirtualized__Grid__innerScrollContainer {
    overflow: visible !important;
  }

  .ReactVirtualized__Table__headerRow {
    border-bottom: 2px solid ${defaultTheme.gray};
    background-color: ${defaultTheme.grayLightest};
    ${props => {
      const brandingTheme = mergeTheme(props.theme, defaultTheme);
      return css`
        color: ${brandingTheme.primary};
      `;
    }}

    .sc-table-header {
      &:focus {
        outline: none;
      }
      display: inline-flex;
      font-size: ${defaultTheme.fontSize.large};
      font-weight: ${defaultTheme.fontWeight.semibold};
      padding: ${defaultTheme.padding.small};
    }
  }

  .ReactVirtualized__Table__row {
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${defaultTheme.gray};
    overflow: visible !important;

    &:hover,
    &:focus {
      background-color: ${defaultTheme.grayLightest};
      outline: none;
      border-bottom: 1px solid transparent;
      cursor: pointer;
    }
  }

  .sc-table-column {
    padding: ${defaultTheme.padding.small};
    overflow: visible !important;
    margin: 0;
  }
`;
const CellContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .sc-dropdown .trigger {
    background-color: transparent;
    color: ${props => mergeTheme(props.theme, defaultTheme).primary};
    padding: ${defaultTheme.padding.smaller} ${defaultTheme.padding.small};
    &:hover {
      color: ${props =>
        Color(mergeTheme(props.theme, defaultTheme).primary)
          .lighten(0.3)
          .hsl()
          .string()};
    }
  }
`;

const CellContent = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const HeaderContainer = styled.div`
  display: flex;
`;

const HeaderSortIcon = styled.div`
  position: relative;
  padding-left: ${defaultTheme.padding.small};

  .fa-sort-up {
    position: absolute;
    color: ${defaultTheme.gray};
    ${props => {
      const brandingTheme = mergeTheme(props.theme, defaultTheme);
      if (props.selected && props.sortDirection === "ASC") {
        return css`
          color: ${brandingTheme.primary};
        `;
      }
    }}
  }

  .fa-sort-down {
    color: ${defaultTheme.gray};
    ${props => {
      const brandingTheme = mergeTheme(props.theme, defaultTheme);
      if (props.selected && props.sortDirection === "DESC") {
        return css`
          color: ${brandingTheme.primary};
        `;
      }
    }}
  }
`;

function Table({
  columns,
  disableHeader,
  headerHeight,
  onHeaderClick,
  onRowClick,
  overscanRowCount,
  rowHeight,
  onSort,
  sortBy,
  sortDirection,
  list
}: Props) {
  const _noRowsRenderer = () => {
    return <div className={"sc-table-noRows"}>No rows</div>;
  };

  const _headerRenderer = ({
    dataKey,
    label,
    sortBy,
    sortDirection,
    disableSort
  }: HeaderProps) => {
    return (
      <HeaderContainer>
        <label>{label}</label>
        {!disableSort && (
          <HeaderSortIcon
            selected={sortBy === dataKey}
            sortDirection={sortDirection}
          >
            <i className="fas fa-sort-up" />
            <i className="fas fa-sort-down" />
          </HeaderSortIcon>
        )}
      </HeaderContainer>
    );
  };
  const _decorateDropdownActions = (actions, rowData) => {
    return actions.map(action => {
      return {
        ...action,
        onClick: () => action.onClick(rowData)
      };
    });
  };

  const rowGetter = ({ index }) => list[index];
  return (
    <AutoSizer className="sc-table">
      {({ height, width }) => (
        <TableContainer>
          <VirtualizedTable
            disableHeader={disableHeader}
            headerClassName={"sc-table-header"}
            headerHeight={headerHeight}
            height={height}
            onHeaderClick={onHeaderClick}
            onRowClick={onRowClick}
            overscanRowCount={overscanRowCount || 5}
            noRowsRenderer={_noRowsRenderer}
            rowClassName={"sc-table-row"}
            rowHeight={rowHeight}
            rowGetter={rowGetter}
            rowCount={list.length}
            sort={onSort}
            sortBy={sortBy}
            sortDirection={sortDirection}
            width={width}
          >
            {columns.map(column => (
              <Column
                key={column.dataKey}
                width={200}
                disableSort={column.disableSort}
                label={column.label}
                dataKey={column.dataKey}
                className={"sc-table-column"}
                cellRenderer={({ cellData, columnIndex, rowData }) => {
                  return (
                    <CellContainer>
                      <CellContent title={cellData}>
                        {column.renderer ? column.renderer(cellData) : cellData}
                      </CellContent>
                      {rowData.actions &&
                        rowData.actions.length &&
                        columnIndex === columns.length - 1 && (
                          <Dropdown
                            icon={<i className="fas fa-ellipsis-v" />}
                            items={_decorateDropdownActions(
                              rowData.actions,
                              rowData
                            )}
                            caret={false}
                          />
                        )}
                    </CellContainer>
                  );
                }}
                flexGrow={1}
                headerRenderer={_headerRenderer}
              />
            ))}
          </VirtualizedTable>
        </TableContainer>
      )}
    </AutoSizer>
  );
}

export default Table;
