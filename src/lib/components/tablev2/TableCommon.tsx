import {
  ComponentType,
  ReactNode,
  Ref,
  useCallback,
  useMemo,
  useRef,
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
import styled, { CSSProperties } from 'styled-components';
import { UnsuccessfulResult } from '../UnsuccessfulResult.component';
import { Tooltip } from '../tooltip/Tooltip.component';
import { HeaderLabel } from './Tablestyle';

const SmoothScrollDiv = forwardRef<HTMLDivElement, any>((props, ref) => {
  const { scrollFade } = useTableContext();
  return (
    <div
      ref={ref}
      {...props}
      style={{ ...props.style, scrollBehavior: 'smooth' }}
      className={[scrollFade && 'scroll-fade', props.className]
        .filter(Boolean)
        .join(' ')}
    />
  );
});

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
  listRef?: Ref<FixedSizeList<Row<DATA_ROW>[]>>;
  /**
   * Signature of the currently visible columns. Each row is rendered through
   * `memo(RenderRow, areEqual)`, and react-window's `areEqual` skips the render
   * when `itemData` is referentially unchanged. react-table keeps the `rows`
   * array identity stable when only column visibility changes (responsive
   * `dropAt`), so without this the header would update while the virtualized
   * body kept its stale cells. Changing this key gives `itemData` a fresh
   * identity, forcing the visible rows to re-render without remounting the list.
   */
  columnsKey?: string;
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
  columnsKey,
}: VirtualizedRowsType<DATA_ROW>) => {
  // Fresh array identity whenever the rows or the visible-column set changes, so
  // react-window's `areEqual` lets the body re-render in step with the header.
  // `columnsKey` is deliberately a dependency though it is not read here — it is
  // the signal that the visible-column set changed.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const itemData = useMemo(() => rows.slice(), [rows, columnsKey]);
  return (
    <AutoSizer disableWidth>
      {({ height }) => {
        return (
          <List
            height={height - 1}
            itemCount={rows.length} // how many items we are going to render
            itemSize={convertRemToPixels(tableRowHeight[rowHeight])} // height of each row in pixel
            width={'100%'}
            itemKey={itemKey}
            itemData={itemData}
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
};

/**
 * Style every body cell gets, given the column's own `cellStyle`.
 *
 * `min-width: 0` is the same reset `TableHeader` carries. A flex item defaults
 * to `min-width: auto`, so without it a short cell freezes at its content width
 * while its header keeps shrinking — and flexbox then redistributes that frozen
 * item's share of the negative free space onto the row's remaining shrinkable
 * cell, pushing it *below* its own header. Both rows have to shrink by the same
 * rules or the columns cannot agree on their widths.
 *
 * It goes before the spread so a consumer's `cellStyle` still wins; the flex
 * centring goes after, because that is the cell's own layout and not a default.
 */
export const bodyCellStyle = (cellStyle?: CSSProperties): CSSProperties => ({
  minWidth: 0,
  ...cellStyle,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

/**
 * Controls a row-wide handler must not act on. A row's `onClick`/`onKeyDown`
 * fires for any click inside it, so without this a click on a button in a cell
 * both activates the button and selects the row — and the selection re-render
 * remounts the cell, closing whatever the button just opened.
 *
 * `label` is here for a label *inside a cell*, wrapping that cell's own control:
 * clicking it activates the control, so the row must not also react.
 * `[role="button"]` catches div-based triggers, which core-ui has its own share
 * of. The selection checkbox is deliberately NOT excluded here — its cell stops
 * propagation itself, because selecting the row is exactly what it is for.
 */
const INTERACTIVE_SELECTOR =
  'button, a, input, select, textarea, label, [role="button"], [role="link"], [role="checkbox"], [role="menuitem"]';

/**
 * Whether a bubbled event reached a row's handler from somewhere the row must
 * not treat as a click on itself.
 *
 * The search is bounded to the row (`currentTarget`) at both ends, and each
 * bound closes a real hole:
 *
 * - **Upwards.** An unbounded `closest()` walks past the row to the document,
 *   so a single element from the selector *anywhere* above the table — a
 *   clickable card wrapping it, an enclosing link — matched for every cell and
 *   disabled row selection across the whole table. The row has no say in what
 *   it is nested inside, so the bound belongs here rather than in a rule about
 *   where a table may be placed.
 * - **Downwards.** A React portal escapes the row in the DOM but still bubbles
 *   to it through the React tree, so plain text in a portalled popover (the
 *   `revealDroppedColumns` panel, a Select menu) reached this handler with
 *   nothing interactive between it and the row, and silently selected the row
 *   behind the open overlay. Anything not contained by the row is not a click
 *   on the row.
 */
export const shouldIgnoreRowEvent = (event: {
  target: EventTarget | null;
  currentTarget: EventTarget | null;
}): boolean => {
  const { target, currentTarget } = event;
  if (!(target instanceof Element) || !(currentTarget instanceof Element)) {
    return false;
  }
  if (!currentTarget.contains(target)) {
    return true;
  }
  const control = target.closest(INTERACTIVE_SELECTOR);
  return !!control && currentTarget.contains(control);
};

/**
 * Reports whether the element the returned ref is attached to is actually
 * ellipsized. Re-measures on resize because a column's width here comes from a
 * grow factor, not a fixed size, so whether a header truncates changes with the
 * table's width and cannot be decided once at mount.
 */
const useIsEllipsized = <T extends HTMLElement>() => {
  const [isEllipsized, setIsEllipsized] = useState(false);
  const observerRef = useRef<ResizeObserver | null>(null);

  const ref = useCallback((node: T | null) => {
    observerRef.current?.disconnect();
    observerRef.current = null;
    if (!node) {
      return;
    }
    const measure = () => setIsEllipsized(node.scrollWidth > node.clientWidth);
    measure();
    if (typeof ResizeObserver === 'undefined') {
      return;
    }
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    observerRef.current = observer;
  }, []);

  return { ref, isEllipsized };
};

/**
 * Makes `Tooltip` safe to put around an ellipsizing flex item.
 *
 * `TooltipContainer` is an `inline-block` with no `min-width: 0`, and it wraps
 * its children in a second plain `div`. Left alone, both sit between the flex
 * item and the text and impose a content-based minimum, so the column stops
 * shrinking and the label never ellipsizes at all — the tooltip would remove
 * the truncation it exists to explain. Forcing the chain to shrinkable blocks
 * keeps `HeaderLabel` the element that runs out of room.
 *
 * Same problem `ConstrainedText` solves with its own `BlockTooltip`.
 */
const HeaderLabelFrame = styled.div`
  /* Shrink-to-fit, exactly as the bare label was: HeaderContent aligns with
     justify-content, which is inert once a child grows to fill the row. A
     growing frame also strands the caret at the far edge instead of beside the
     label, since end-aligned columns place it with order: -1. */
  min-width: 0;

  > .sc-tooltip,
  > .sc-tooltip > div {
    display: block;
    min-width: 0;
  }
`;

/**
 * A header label that offers its full text through a `Tooltip` once it no
 * longer fits. Body cells already recover via `ConstrainedText`, so an
 * ellipsized header was the one place a label became unreadable with no way to
 * get it back.
 *
 * `Tooltip` rather than a native `title`: `title` is drawn by the OS after a
 * ~1s delay that cannot be configured, which reads as nothing happening. It
 * also collides here — react-table's `getSortByToggleProps()` already puts
 * `title="Toggle SortBy"` on the header itself, so a sortable header would
 * carry two competing titles and which one appears depends on the pixel hovered.
 *
 * The wrapper chain is rendered in **every** state and only `overlay` is
 * conditional. Mounting the tooltip on the flip instead would change the DOM
 * under the element being measured, refire the ref against a differently-sized
 * container, and let the two states oscillate.
 *
 * Truncation costs nothing in the accessibility tree — the full text is still
 * in the DOM and still the header's accessible name — so this is a visual
 * affordance only.
 */
export const TruncatableHeaderLabel = ({
  header,
  children,
}: {
  header: unknown;
  children: ReactNode;
}) => {
  const { ref, isEllipsized } = useIsEllipsized<HTMLSpanElement>();
  const canRecover = typeof header === 'string' && isEllipsized;

  return (
    <HeaderLabelFrame>
      <Tooltip overlay={canRecover ? header : undefined} placement="top">
        <HeaderLabel ref={ref}>{children}</HeaderLabel>
      </Tooltip>
    </HeaderLabelFrame>
  );
};

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
  RenderRow: ComponentType<ListChildComponentProps<Row<DATA_ROW>[]>>;
  listRef?: Ref<FixedSizeList<Row<DATA_ROW>[]>>;
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
  const {
    rows,
    status,
    entityName,
    rowHeight,
    onBottom,
    onBottomOffset,
    headerGroups,
  } = useTableContext<DATA_ROW>();
  const { bodyRef } = useSyncedScroll<DATA_ROW>();

  // headerGroups only contains visible columns, so this string changes whenever
  // a responsive column drops or reappears — used to re-sync the virtualized
  // body with the header (see VirtualizedRows.columnsKey).
  const columnsKey = headerGroups
    .map((group) => group.headers.map((header) => header.id).join(','))
    .join('|');
  const listRef: Ref<FixedSizeList<Row<DATA_ROW>[]>> =
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
            columnsKey={columnsKey}
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
          columnsKey={columnsKey}
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
