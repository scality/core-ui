import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import "react-virtualized/styles.css";
import * as defaultTheme from "../../style/theme";
import { mergeTheme } from "../../utils";

import {
  Column,
  Table as VirtualizedTable,
  AutoSizer
} from "react-virtualized";

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
  .ReactVirtualized__Table__headerRow {
    border-bottom: 2px solid ${defaultTheme.gray};
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
  }
`;

const HeaderContainer = styled.div`
  display: flex;
`;

const HeaderSortIcon = styled.div`
  position: relative;
  padding-left: 10px;

  .fa-sort-up {
    position: absolute;
    color: ${defaultTheme.grayLight};
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
    color: ${defaultTheme.grayLight};
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

class Table extends React.PureComponent {
  constructor(props) {
    super(props);
    this._noRowsRenderer = this._noRowsRenderer.bind(this);
    this._headerRenderer = this._headerRenderer.bind(this);
  }

  _noRowsRenderer() {
    return <div className={"sc-table-noRows"}>No rows</div>;
  }

  _headerRenderer({ dataKey, label, sortBy, sortDirection, disableSort }) {
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
  }

  render() {
    const {
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
    } = this.props;
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
              noRowsRenderer={this._noRowsRenderer}
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
                  cellRenderer={({ cellData }) => cellData}
                  flexGrow={1}
                  headerRenderer={this._headerRenderer}
                />
              ))}
            </VirtualizedTable>
          </TableContainer>
        )}
      </AutoSizer>
    );
  }
}

Table.propTypes = {
  list: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  disableHeader: PropTypes.bool,
  headerHeight: PropTypes.number,
  onHeaderClick: PropTypes.func,
  onRowClick: PropTypes.func,
  overscanRowCount: PropTypes.number,
  rowHeight: PropTypes.number,
  onSort: PropTypes.func,
  sortBy: PropTypes.string,
  sortDirection: PropTypes.string
};

export default Table;
