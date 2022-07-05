import { useEffect, useState, useCallback } from 'react';
import { Row } from 'react-table';
import { FixedSizeList } from 'react-window';

export default function useSyncedScroll<
  DATA_ROW extends Record<string, unknown> = Record<string, unknown>,
>(): {
  headerRef: (element: HTMLDivElement) => void;
  bodyRef: (tableBody: FixedSizeList<Row<DATA_ROW>[]>) => void;
} {
  const [listener, setListener] = useState<(event: Event) => void | null>(null);
  const [tableBody, setTableBody] =
    useState<FixedSizeList<Row<DATA_ROW>[]> | null>(null);

  const headerRef = useCallback(
    (element: HTMLDivElement) => {
      if (element) {
        const callback = (event: Event) => {
          if (element && event) {
            element.scrollTo({
              left: (event.target as HTMLDivElement).scrollLeft,
              top: 0,
            });
          }
        };
        if (!listener) {
          setListener(() => {
            return callback;
          });
        }
      }
    },
    [listener],
  );

  const bodyRef = useCallback((tableBody: FixedSizeList<Row<DATA_ROW>[]>) => {
    setTableBody(tableBody);
  }, []);

  useEffect(() => {
    if (tableBody && listener) {
      /*
      We intentionally use _outerRef prop here despite the fact that it is 
      internal use only and not typed, as it is the only way for us to access to the scrollable element
      */
      //@ts-expect-error
      (tableBody._outerRef as HTMLDivElement).addEventListener(
        'scroll',
        listener,
      );

      return () => {
        //@ts-expect-error
        if (tableBody && tableBody._outerRef) {
          //@ts-expect-error
          tableBody._outerRef.removeEventListener('scroll', listener);
        }
      };
    }
  }, [tableBody, listener]);

  return { headerRef, bodyRef };
}
