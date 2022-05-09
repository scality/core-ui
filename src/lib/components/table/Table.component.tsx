import React from 'react';

import styled, { css } from 'styled-components';
import 'react-virtualized/styles.css';
import { lighten, ellipsis } from 'polished';
import * as defaultTheme from '../../style/theme';
import { getTheme, getThemePropSelector } from '../../utils';
import Dropdown from '../dropdown/Dropdown.component';
import {
  Column,
  Table as VirtualizedTable,
  AutoSizer,
} from 'react-virtualized';
export type Props = {
  list: Array<any>;
  columns: Array<any>;
  disableHeader: boolean;
  headerHeight: number;
  onHeaderClick?: (arg0: any) => void;
  onRowClick: (arg0: { rowData: any }) => void;
  overscanRowCount?: number;
  rowHeight: number;
  onSort: (arg0: { sortBy: string; sortDirection: string }) => void;
  sortBy: string;
  sortDirection: string;
  noRowsRenderer?: (arg0: any) => JSX.Element;
};
type HeaderProps = {
  dataKey: string;
  label: string;
  sortBy: string;
  sortDirection: string;
  disableSort: boolean;
};
const TableContainer = styled.div`
  .ReactVirtualized__Table__Grid {
    color: ${getThemePropSelector('textPrimary')};
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

  .ReactVirtualized__Table__headerColumn {
    margin: 0;
  }

  .ReactVirtualized__Grid__innerScrollContainer {
    overflow: visible !important;
  }

  .ReactVirtualized__Table__headerRow {
    background-color: ${getThemePropSelector('backgroundLevel3')};
    border-bottom: 2px solid ${getThemePropSelector('borderLight')};
    color: ${getThemePropSelector('textPrimary')};

    text-transform: none;

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
    overflow: visible !important;
    color: ${getThemePropSelector('textPrimary')};
    background-color: ${getThemePropSelector('backgroundLevel3')};
    border-top: 1px solid ${getThemePropSelector('borderLight')};
    border-bottom: 1px solid ${getThemePropSelector('borderLight')};
    box-sizing: border-box;
    &:hover,
    &:focus {
      background-color: ${getThemePropSelector('highlight')};
      border-top: 1px solid ${getThemePropSelector('secondary')};
      border-bottom: 1px solid ${getThemePropSelector('secondary')};
      outline: none;
      cursor: pointer;
    }
  }

  .ReactVirtualized__Table__headerColumn {
    margin-right: 0;
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
    color: ${getThemePropSelector('textPrimary')};
    padding: ${defaultTheme.padding.smaller} ${defaultTheme.padding.small};
    &:hover {
      color: ${(props) => lighten(0.3, getTheme(props).primary).toString()};
    }
  }
`;
const CellContent = styled.span`
  ${ellipsis()}
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
    ${(props) => {
      if (props.selected && props.sortDirection === 'ASC') {
        return css`
          color: ${getTheme(props).primary};
        `;
      }
    }}
  }

  .fa-sort-down {
    color: ${defaultTheme.gray};
    ${(props) => {
      if (props.selected && props.sortDirection === 'DESC') {
        return css`
          color: ${getTheme(props).primary};
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
  list,
  noRowsRenderer,
}: Props) {
  const _defaultNoRowsRenderer = () => {
    return <div className={'sc-table-noRows'}>No rows</div>;
  };

  const _headerRenderer = ({
    dataKey,
    label,
    sortBy,
    sortDirection,
    disableSort,
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
    return actions.map((action) => {
      return { ...action, onClick: () => action.onClick(rowData) };
    });
  };

  const rowGetter = ({ index }) => list[index];

  return (
    <AutoSizer
      className="sc-table"
      style={{
        height: 'auto',
        width: 'auto',
      }}
    >
      {({ height, width }) => (
        <TableContainer>
          <VirtualizedTable
            disableHeader={disableHeader}
            headerClassName={'sc-table-header'}
            headerHeight={headerHeight}
            height={height}
            onHeaderClick={onHeaderClick}
            onRowClick={onRowClick}
            overscanRowCount={overscanRowCount || 5}
            noRowsRenderer={noRowsRenderer || _defaultNoRowsRenderer}
            rowClassName={'sc-table-row'}
            rowHeight={rowHeight}
            rowGetter={rowGetter}
            rowCount={list.length}
            sort={onSort}
            sortBy={sortBy}
            sortDirection={sortDirection}
            width={width}
          >
            {columns.map((column) => (
              <Column
                key={column.dataKey}
                width={column.width || 200}
                flexGrow={column.flexGrow || 0}
                flexShrink={column.flexShrink || 1}
                disableSort={column.disableSort}
                label={column.label}
                dataKey={column.dataKey}
                className={'sc-table-column'}
                cellRenderer={({ cellData, columnIndex, rowData }) => {
                  return (
                    <CellContainer
                      className={`sc-table-column-cell-container-${column.dataKey}`}
                    >
                      <CellContent
                        className={`sc-table-column-cell-${column.dataKey}`}
                        title={cellData}
                      >
                        {column.renderer
                          ? column.renderer(cellData, rowData)
                          : cellData}
                      </CellContent>
                      {rowData.actions &&
                        rowData.actions.length &&
                        columnIndex === columns.length - 1 && (
                          <Dropdown
                            icon={<i className="fas fa-ellipsis-v" />}
                            items={_decorateDropdownActions(
                              rowData.actions,
                              rowData,
                            )}
                            caret={false}
                          />
                        )}
                    </CellContainer>
                  );
                }}
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
