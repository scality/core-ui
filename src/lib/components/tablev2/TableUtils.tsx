import { useCallback, useState } from 'react';
import { Row } from 'react-table';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';

const STATUS_CRITICAL = 'critical';
const STATUS_WARNING = 'warning';
const STATUS_NONE = 'none';
const STATUS_HEALTH = 'healthy';

type StatusType =
  | typeof STATUS_CRITICAL
  | typeof STATUS_WARNING
  | typeof STATUS_NONE
  | typeof STATUS_HEALTH;

// some common customized sortTypes
export function compareHealth(
  status1: StatusType,
  status2: StatusType,
): number {
  if (
    ![STATUS_WARNING, STATUS_CRITICAL, STATUS_NONE, STATUS_HEALTH].includes(
      status1,
    ) ||
    ![STATUS_WARNING, STATUS_CRITICAL, STATUS_NONE, STATUS_HEALTH].includes(
      status2,
    )
  ) {
    console.error('Invalid health status');
    return;
  }

  const weights = {};
  weights[STATUS_CRITICAL] = 3;
  weights[STATUS_WARNING] = 2;
  weights[STATUS_NONE] = 1;
  weights[STATUS_HEALTH] = 0;
  return weights[status1] === weights[status2]
    ? 0
    : weights[status1] > weights[status2]
    ? 1
    : -1;
}

export function convertRemToPixels(rem) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}
export type TableLocalType = 'en' | 'fr';

export type TableHeightKeyType = 'h32' | 'h40' | 'h48' | 'h64';

export type TableVariantType =
  | 'backgroundLevel1'
  | 'backgroundLevel2'
  | 'backgroundLevel3'
  | 'backgroundLevel4';

// in rem unit
export const tableRowHeight = {
  h32: '2.286',
  h40: '2.858',
  h48: '3.428',
  h64: '4.572',
};

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
