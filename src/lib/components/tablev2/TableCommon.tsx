import React, { ComponentType, LegacyRef, useCallback, useState } from 'react';
import { Row } from 'react-table';
import AutoSizer from 'react-virtualized-auto-sizer';
import {
  FixedSizeList,
  FixedSizeList as List,
  ListChildComponentProps,
  ListItemKeySelector,
} from 'react-window';
import {
  convertRemToPixels,
  translatedMessages,
  TableHeightKeyType,
  TableLocalType,
  tableRowHeight,
} from './TableUtils';
import { useTableContext } from './Tablev2.component';
import { NoResult } from './Tablestyle';
import { Loader } from '../loader/Loader.component';
import { Text } from '../text/Text.component';
import { Icon } from '../icon/Icon.component';
import useSyncedScroll from './useSyncedScroll';
import { CSSProperties } from 'styled-components';

type VirtualizedRowsType<
  DATA_ROW extends Record<string, unknown> = Record<string, unknown>,
> = {
  rows: Row<DATA_ROW>[];
  RenderRow: ComponentType<ListChildComponentProps<Row<DATA_ROW>[]>>;
  rowHeight: TableHeightKeyType;
  setHasScrollbar: React.Dispatch<React.SetStateAction<boolean>>;
  hasScrollbar?: boolean;
  itemKey?: ListItemKeySelector<Row<DATA_ROW>[]>;
  onBottom?: (rowLength: number) => void;
  onBottomOffset?: number;
  listRef?: LegacyRef<FixedSizeList<Row<DATA_ROW>[]>>;
};

export const VirtualizedRows = <
  DATA_ROW extends Record<string, unknown> = Record<string, unknown>,
>({
  rows,
  rowHeight,
  setHasScrollbar,
  onBottom,
  onBottomOffset,
  RenderRow,
  listRef,
  itemKey,
}: VirtualizedRowsType<DATA_ROW>) => (
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
          ref={listRef}
          onItemsRendered={({
            visibleStartIndex,
            visibleStopIndex,
            overscanStopIndex,
          }) => {
            setHasScrollbar(
              visibleStopIndex - visibleStartIndex < overscanStopIndex,
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

export type RenderRowType = {
  index: number;
  style: CSSProperties;
};

type TableRowsProps<
  DATA_ROW extends Record<string, unknown> = Record<string, unknown>,
> = {
  locale?: TableLocalType;
  children?: (children: JSX.Element) => JSX.Element;
  customItemKey?: (index: number, data: DATA_ROW) => string;
  RenderRow: React.MemoExoticComponent<
    ({ index, style }: RenderRowType) => JSX.Element
  >;
};
export function TableRows<
  DATA_ROW extends Record<string, unknown> = Record<string, unknown>,
>({ locale, children, customItemKey, RenderRow }: TableRowsProps<DATA_ROW>) {
  const { setHasScrollbar } = useTableScrollbar();
  const { rows, status, entity, rowHeight, onBottom, onBottomOffset } =
    useTableContext();
  const { bodyRef } = useSyncedScroll();

  function itemKey(index, data) {
    if (typeof customItemKey === 'function') {
      return customItemKey(index, data);
    }

    return index;
  }

  if (status === 'idle' || status === 'loading') {
    return (
      <NoResult rowHeight={rowHeight}>
        <Loader />
        <Text color="textSecondary">
          {translatedMessages('loading', entity, locale)}
        </Text>
      </NoResult>
    );
  }
  if (status === 'error') {
    return (
      <NoResult rowHeight={rowHeight}>
        <Icon name="Exclamation-circle" color="statusWarning" />
        <Text color="textSecondary">
          {translatedMessages('error', entity, locale)}
        </Text>
      </NoResult>
    );
  }
  if (status === 'success' || status === undefined) {
    if (typeof children === 'function') {
      return children(
        <VirtualizedRows
          rows={rows}
          listRef={bodyRef}
          itemKey={itemKey}
          rowHeight={rowHeight}
          setHasScrollbar={setHasScrollbar}
          onBottom={onBottom}
          onBottomOffset={onBottomOffset}
          RenderRow={RenderRow}
        />,
      );
    } else if (rows.length) {
      return (
        <VirtualizedRows
          rows={rows}
          listRef={bodyRef}
          setHasScrollbar={setHasScrollbar}
          onBottom={onBottom}
          onBottomOffset={onBottomOffset}
          itemKey={itemKey}
          rowHeight={rowHeight}
          RenderRow={RenderRow}
        />
      );
    } else {
      return (
        <NoResult rowHeight={rowHeight}>
          {translatedMessages('noResult', entity, locale)}
        </NoResult>
      );
    }
  }

  return null;
}
