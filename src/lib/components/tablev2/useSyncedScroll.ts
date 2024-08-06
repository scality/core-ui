import { useEffect, useState, useCallback, useRef } from 'react';
import { Row } from 'react-table';
import { FixedSizeList } from 'react-window';
import { useTableContext } from './Tablev2.component';

export default function useSyncedScroll<
  DATA_ROW extends Record<string, unknown> = Record<string, unknown>,
>(): {
  headerRef: (element: HTMLDivElement) => void;
  bodyRef: React.RefObject<FixedSizeList<Row<DATA_ROW>[]>>;
} {
  const { syncScrollListener, setSyncScrollListener } = useTableContext();

  const headerRef = useCallback(
    (element: HTMLDivElement) => {
      console.log('elementaire', element);
      if (element) {
        const callback = (event: Event) => {
          if (element && event) {
            console.log('element', element);
            element.scrollTo({
              left: (event.target as HTMLDivElement).scrollLeft,
              top: 0,
            });
          }
        };
        if (!syncScrollListener) {
          console.log('setSyncScrollListener', setSyncScrollListener);
          setSyncScrollListener(() => {
            console.log('callback', callback);
            return callback;
          });
        }
      }
    },
    [syncScrollListener],
  );

  const bodyRef = useRef<FixedSizeList<Row<DATA_ROW>[]> | null>(null);

  useEffect(() => {
    if (bodyRef.current && syncScrollListener) {
      /*
      We intentionally use _outerRef prop here despite the fact that it is 
      internal use only and not typed, as it is the only way for us to access to the scrollable element
      */
      //@ts-expect-error
      (bodyRef.current._outerRef as HTMLDivElement).addEventListener(
        'scroll',
        syncScrollListener,
      );
    }
    return () => {
      //@ts-expect-error
      if (bodyRef.current && bodyRef.current._outerRef) {
        //@ts-expect-error
        bodyRef.current._outerRef.removeEventListener(
          'scroll',
          syncScrollListener,
        );
      }
    };
  }, [bodyRef.current, syncScrollListener]);

  return { headerRef, bodyRef };
}
