import React from 'react';
import { useEffect, useState, createContext, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { QueryTimeSpan } from '../constants';
import { queryTimeSpansCodes } from '../constants';
export const MetricsTimeSpanContext = createContext<QueryTimeSpan | null>(null);
export const MetricsTimeSpanProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  // the default timespan is the last 24h
  const [queryTimeSpanCode, setQueryTimeSpanCode] = useState(
    queryTimeSpansCodes[1],
  );
  const urlSearchParams = new URLSearchParams(useLocation().search);
  const queryTimeSpan = urlSearchParams.get('from');
  // Sync url timespan to local timespan
  useEffect(() => {
    if (queryTimeSpan) {
      const queryTimeSpanCode = queryTimeSpansCodes.find(
        (item) => item.query === queryTimeSpan,
      );

      if (queryTimeSpanCode && queryTimeSpanCode.label) {
        setQueryTimeSpanCode(queryTimeSpanCode);
      } else {
        console.error(
          'Unexpected timespan query parameter defined in the URL.',
        );
      }
    }
  }, [queryTimeSpan]);
  return (
    <MetricsTimeSpanContext.Provider value={queryTimeSpanCode}>
      {children}
    </MetricsTimeSpanContext.Provider>
  );
};
export const useMetricsTimeSpan = (): QueryTimeSpan => {
  const metricsTimeSpanContext = useContext(MetricsTimeSpanContext);

  if (!metricsTimeSpanContext) {
    throw new Error(
      "useMetricsTimeSpan hook can't be use outside <MetricsTimeSpanProvider/>",
    );
  }

  return metricsTimeSpanContext;
};
