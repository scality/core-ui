import { useCallback, useState } from 'react';
import { Row } from 'react-table';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';
import {
  convertRemToPixels,
  TableHeightKeyType,
  tableRowHeight,
} from './TableUtils';

type VirtualizedRowsType = {
  rows: Row<object>[];
  RenderRow: React.NamedExoticComponent<object>;
  rowHeight: TableHeightKeyType;
  setHasScrollbar: React.Dispatch<React.SetStateAction<boolean>>;
  itemKey?: (index: Number, data: any) => string;
  onBottom?: (rowLength: number) => void;
  onBottomOffset?: number;
};

export const VirtualizedRows = ({
  rows,
  rowHeight,
  setHasScrollbar,
  onBottom,
  onBottomOffset,
  RenderRow,
  itemKey,
}: VirtualizedRowsType) => (
  <AutoSizer>
    {({ height, width }) => {
      return (
        <List
          height={height}
          itemCount={rows.length} // how many items we are going to render
          itemSize={convertRemToPixels(tableRowHeight[rowHeight])} // height of each row in pixel
          width={width}
          itemKey={itemKey}
          itemData={rows}
          onItemsRendered={({
            visibleStartIndex,
            visibleStopIndex,
            overscanStopIndex,
          }) => {
            setHasScrollbar(
              visibleStartIndex - visibleStopIndex <= overscanStopIndex,
            );

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
