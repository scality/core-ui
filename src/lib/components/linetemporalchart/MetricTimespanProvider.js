//@flow
import React, { type Node } from 'react';
import { useEffect, useState, createContext, useContext } from 'react';
import { useLocation } from 'react-router-dom';

import {
  SAMPLE_DURATION_LAST_TWENTY_FOUR_HOURS,
  SAMPLE_FREQUENCY_LAST_TWENTY_FOUR_HOURS,
  queryTimeSpansCodes,
} from '../constants.js';

export type MetricsTimeSpanContextValue = {
  metricsTimeSpan: number,
  sampleFrequency: number,
};
export const MetricsTimeSpanContext = createContext<MetricsTimeSpanContextValue | null>(
  null,
);

export const MetricsTimeSpanProvider = ({ children }: { children: Node }) => {
  // the value is the same as the sample duration of the last 24h
  const [metricsTimeSpan, setMetricsTimeSpan] = useState(
    SAMPLE_DURATION_LAST_TWENTY_FOUR_HOURS,
  );
  const [sampleFrequency, setSampleFrequency] = useState(
    SAMPLE_FREQUENCY_LAST_TWENTY_FOUR_HOURS,
  );
  const urlSearchParams = new URLSearchParams(useLocation().search);
  const queryTimeSpan = urlSearchParams.get('from');

  // Sync url timespan to local timespan
  useEffect(() => {
    if (queryTimeSpan) {
      const formatted = queryTimeSpansCodes.find(
        (item) => item.label === queryTimeSpan,
      );
      if (formatted && formatted.duration) {
        setMetricsTimeSpan(formatted.duration);
        setSampleFrequency(formatted.frequency);
      }
    }
  }, [queryTimeSpan]);

  return (
    <MetricsTimeSpanContext.Provider
      value={{
        metricsTimeSpan,
        sampleFrequency,
      }}
    >
      {children}
    </MetricsTimeSpanContext.Provider>
  );
};

export const useMetricsTimeSpan = (): {
  metricsTimeSpan: number,
  sampleFrequency: number,
} => {
  const metricsTimeSpanContext = useContext(MetricsTimeSpanContext);

  if (!metricsTimeSpanContext) {
    throw new Error(
      "useMetricsTimeSpan hook can't be use outside <MetricsTimeSpanProvider/>",
    );
  }
  const { metricsTimeSpan, sampleFrequency } = metricsTimeSpanContext;

  return { metricsTimeSpan, sampleFrequency };
};
