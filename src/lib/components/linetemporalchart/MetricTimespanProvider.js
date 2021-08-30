//@flow
import React, { type Node } from 'react';
import { useEffect, useState, createContext, useContext } from 'react';
import { useLocation } from 'react-router-dom';

import {
  SAMPLE_DURATION_LAST_TWENTY_FOUR_HOURS,
  SAMPLE_FREQUENCY_LAST_TWENTY_FOUR_HOURS,
  QUERY_LAST_TWENTY_FOUR_HOURS,
  LAST_TWENTY_FOUR_HOURS,
  queryTimeSpansCodes,
} from '../constants.js';

export type MetricsTimeSpanContextValue = {
  label: string,
  value: string,
  metricsTimeSpan: number,
  sampleFrequency: number,
};

export const MetricsTimeSpanContext = createContext<MetricsTimeSpanContextValue | null>(
  null,
);

export const MetricsTimeSpanProvider = ({ children }: { children: Node }) => {
  // the default timespan is the last 24h
  const [queryTimeSpanCode, setQueryTimeSpanCode] = useState({
    label: QUERY_LAST_TWENTY_FOUR_HOURS,
    value: LAST_TWENTY_FOUR_HOURS,
    duration: SAMPLE_DURATION_LAST_TWENTY_FOUR_HOURS,
    frequency: SAMPLE_FREQUENCY_LAST_TWENTY_FOUR_HOURS,
  });
  const urlSearchParams = new URLSearchParams(useLocation().search);
  const queryTimeSpan = urlSearchParams.get('from');

  // Sync url timespan to local timespan
  useEffect(() => {
    if (queryTimeSpan) {
      const queryTimeSpanCode = queryTimeSpansCodes.find(
        (item) => item.label === queryTimeSpan,
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
    <MetricsTimeSpanContext.Provider
      value={{
        label: queryTimeSpanCode.label,
        value: queryTimeSpanCode.value,
        metricsTimeSpan: queryTimeSpanCode.duration,
        sampleFrequency: queryTimeSpanCode.frequency,
      }}
    >
      {children}
    </MetricsTimeSpanContext.Provider>
  );
};

export const useMetricsTimeSpan = (): {
  label: string,
  value: string,
  metricsTimeSpan: number,
  sampleFrequency: number,
} => {
  const metricsTimeSpanContext = useContext(MetricsTimeSpanContext);

  if (!metricsTimeSpanContext) {
    throw new Error(
      "useMetricsTimeSpan hook can't be use outside <MetricsTimeSpanProvider/>",
    );
  }
  const {
    label,
    value,
    metricsTimeSpan,
    sampleFrequency,
  } = metricsTimeSpanContext;

  return { label, value, metricsTimeSpan, sampleFrequency };
};
