import React, { useEffect, useRef } from "react";
import { Row } from "react-table";
import { FixedSizeList } from "react-window";

export default function useSyncedScroll<
  DATA_ROW extends Record<string, unknown> = Record<string, unknown>,
>(): { headerRef: React.MutableRefObject<HTMLDivElement>, bodyRef: React.MutableRefObject<FixedSizeList<Row<DATA_ROW>[]>>}{
  const headerRef = useRef<HTMLDivElement | null>(null);
  const bodyRef = useRef<FixedSizeList<Row<DATA_ROW>[]> | null>(null);

  useEffect(() => {
    if (bodyRef.current && headerRef.current) {
      const listener = (event: Event) => {
        headerRef.current.scrollTo({
          left: (event.target as HTMLDivElement).scrollLeft,
          top: 0,
        });
      };
      /*
      We intentionally use _outerRef prop here despite the fact that it is 
      internal use only and not typed, as it is the only way for us to access to the scrollable element
      */
      //@ts-expect-error
      (bodyRef.current._outerRef as HTMLDivElement).addEventListener(
        'scroll',
        listener,
      );

      return () => {
        if (bodyRef.current) {
          //@ts-expect-error
          bodyRef.current._outerRef.removeEventListener('scroll', listener);
        }
      };
    }
  });

  return { headerRef, bodyRef };
};
