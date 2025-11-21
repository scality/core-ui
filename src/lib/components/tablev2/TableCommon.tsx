import {
  ComponentType,
  LegacyRef,
  useCallback,
  useState,
  forwardRef,
} from 'react';
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
  TableHeightKeyType,
  TableLocalType,
  tableRowHeight,
} from './TableUtils';
import { useTableContext } from './Tablev2.component';
import useSyncedScroll from './useSyncedScroll';
import { CSSProperties } from 'styled-components';
import { UnsuccessfulResult } from '../UnsuccessfulResult.component';

const SmoothScrollDiv = forwardRef<HTMLDivElement, any>((props, ref) => (
  <div
    ref={ref}
    {...props}
    style={{ ...props.style, scrollBehavior: 'smooth' }}
  />
));

type VirtualizedRowsType<
  DATA_ROW extends Record<string, unknown> = Record<string, unknown>,
> = {
  rows: Row<DATA_ROW>[];
  RenderRow: ComponentType<
    React.PropsWithChildren<ListChildComponentProps<Row<DATA_ROW>[]>>
  >;
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
  <AutoSizer disableWidth>
    {({ height }) => {
      return (
        <List
          height={height - 1}
          itemCount={rows.length} // how many items we are going to render
          itemSize={convertRemToPixels(tableRowHeight[rowHeight])} // height of each row in pixel
          width={'100%'}
          itemKey={itemKey}
          itemData={rows}
          ref={listRef}
          outerElementType={SmoothScrollDiv}
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
  const { hasScrollbar, setHasScrollbar } = useTableContext();
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
  listRef?: LegacyRef<FixedSizeList<Row<DATA_ROW>[]>>;
};
export function TableRows<
  DATA_ROW extends Record<string, unknown> = Record<string, unknown>,
>({
  locale,
  children,
  customItemKey,
  RenderRow,
  listRef: externalListRef,
}: TableRowsProps<DATA_ROW>) {
  const { setHasScrollbar } = useTableScrollbar();
  const { rows, status, entityName, rowHeight, onBottom, onBottomOffset } =
    useTableContext<DATA_ROW>();
  const { bodyRef } = useSyncedScroll<DATA_ROW>();
  const listRef: LegacyRef<FixedSizeList<Row<DATA_ROW>[]>> =
    externalListRef || bodyRef;

  function itemKey(index, data) {
    if (typeof customItemKey === 'function') {
      return customItemKey(index, data);
    }

    return index;
  }

  if (status === 'idle' || status === 'loading' || status === 'error') {
    return (
      <UnsuccessfulResult
        name={entityName}
        status={status}
        locale={locale}
        rowHeight={rowHeight}
      />
    );
  }
  if (status === 'success' || status === undefined) {
    if (typeof children === 'function') {
      if (rows.length) {
        return children(
          <VirtualizedRows<DATA_ROW>
            rows={rows}
            listRef={listRef}
            itemKey={itemKey}
            rowHeight={rowHeight}
            setHasScrollbar={setHasScrollbar}
            onBottom={onBottom}
            onBottomOffset={onBottomOffset}
            RenderRow={RenderRow}
          />,
        );
      } else {
        return children(
          <UnsuccessfulResult
            rowHeight={rowHeight}
            name={entityName}
            status="noResult"
          />,
        );
      }
    } else if (rows.length) {
      return (
        <VirtualizedRows<DATA_ROW>
          rows={rows}
          listRef={listRef}
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
        <UnsuccessfulResult
          rowHeight={rowHeight}
          name={entityName}
          status="noResult"
        />
      );
    }
  }

  return null;
}
