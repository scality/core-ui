import { createContext, useContext, useEffect, useState } from 'react';
import { QueryTimeSpan, queryTimeSpansCodes } from '../constants';
import { useLocation } from 'react-router';
export const MetricsTimeSpanContext = createContext<QueryTimeSpan | null>(null);
/**
 * Holds the time span the charts below it query, taken from the `from` search
 * parameter of `location` and defaulting to the last 24 hours. Mount it above
 * the charts that should move together when the span changes.
 */
export const MetricsTimeSpanProvider = ({
  children,
  location,
}: {
  children: JSX.Element;
  location?: ReturnType<typeof useLocation>;
}) => {
  // the default timespan is the last 24h
  const [queryTimeSpanCode, setQueryTimeSpanCode] = useState(
    queryTimeSpansCodes[1],
  );
  const urlSearchParams = new URLSearchParams(location?.search);
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
/**
 * The time span the nearest `MetricsTimeSpanProvider` holds. It throws outside
 * a provider.
 */
export const useMetricsTimeSpan = (): QueryTimeSpan => {
  const metricsTimeSpanContext = useContext(MetricsTimeSpanContext);

  if (!metricsTimeSpanContext) {
    throw new Error(
      "useMetricsTimeSpan hook can't be use outside <MetricsTimeSpanProvider/>",
    );
  }

  return metricsTimeSpanContext;
};
