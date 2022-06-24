import { ComponentType, useCallback, useState } from 'react';
import { Row } from 'react-table';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List, ListChildComponentProps, ListItemKeySelector } from 'react-window';
import {
  convertRemToPixels,
  TableHeightKeyType,
  tableRowHeight,
} from './TableUtils';

type VirtualizedRowsType<DATA_ROW extends Record<string, unknown> = Record<string, unknown>> = {
  rows: Row<DATA_ROW>[];
  RenderRow: ComponentType<ListChildComponentProps<Row<DATA_ROW>[]>>;
  rowHeight: TableHeightKeyType;
  setHasScrollbar: React.Dispatch<React.SetStateAction<boolean>>;
  hasScrollbar?: boolean;
  itemKey?: ListItemKeySelector<Row<DATA_ROW>[]>;
  onBottom?: (rowLength: number) => void;
  onBottomOffset?: number;
};

export const VirtualizedRows = ({
  rows,
  rowHeight,
  setHasScrollbar,
  hasScrollbar,
  onBottom,
  onBottomOffset,
  RenderRow,
  itemKey,
}: VirtualizedRowsType) => (
  <AutoSizer>
    {({ height, width }) => {
      const style = hasScrollbar === false ? { overflow: 'visible'} : null;
      return (
        <List
          height={height}
          itemCount={rows.length} // how many items we are going to render
          itemSize={convertRemToPixels(tableRowHeight[rowHeight])} // height of each row in pixel
          width={width}
          itemKey={itemKey}
          itemData={rows}
          style={style}
          onItemsRendered={({
            visibleStartIndex,
            visibleStopIndex,
            overscanStopIndex,
          }) => {
            if (hasScrollbar !== false) {
              setHasScrollbar(
                visibleStartIndex - visibleStopIndex <= overscanStopIndex,
              );
            }

            if (
              onBottom &&
              onBottomOffset != null &&
              overscanStopIndex >= rows.length - 1 - onBottomOffset
            ) {
              onBottom(rows.length);
            }
          }}
        >
          {RenderRow}
        </List>
      );
    }}
  </AutoSizer>
);

export const useTableScrollbar = () => {
  const [hasScrollbar, setHasScrollbar] = useState(false);
  const [scrollBarWidth, setScrollBarWidth] = useState(0);

  const handleScrollbarWidth = useCallback((node) => {
    if (node) {
      const scrollDiv = document.createElement('div');
      scrollDiv.setAttribute(
        'style',
        'width: 100px; height: 100px; overflow: scroll; position:absolute; top:-9999px;',
      );
      node.appendChild(scrollDiv);
      const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      node.removeChild(scrollDiv);
      setScrollBarWidth(scrollbarWidth);
    }
  }, []);

  return {
    hasScrollbar,
    setHasScrollbar,
    scrollBarWidth,
    handleScrollbarWidth,
  };
};
