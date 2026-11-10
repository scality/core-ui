import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ChartColors } from '../../../style/theme';

export const useChartId = (): string => {
  const idRef = useRef<string | null>(null);

  if (idRef.current === null) {
    idRef.current = uuidv4();
  }

  return idRef.current;
};

export type ChartLegendState = {
  selectedResources: string[];
  addSelectedResource: (resource: string) => void;
  removeSelectedResource: (resource: string) => void;
  selectAllResources: () => void;
  selectOnlyResource: (resource: string) => void;
  isSelected: (resource: string) => boolean;
  getColor: (resource: string) => string | undefined;
  getLabel: (resource: string) => string;
  listResources: () => string[];
  isOnlyOneSelected: () => boolean;
  register: (chartId: string, seriesNames: string[]) => void;
  /** Declares, for one chart, which of its resources are drawn dashed. */
  registerLineStyles: (
    chartId: string,
    isDashedByResource: Record<string, boolean>,
  ) => void;
  /** Drops a chart's line styles, when it unmounts. */
  unregisterLineStyles: (chartId: string) => void;
  /** True when every chart drawing the resource draws it dashed. */
  isLineDashed: (resource: string) => boolean;
};


// Equal maps keep the state reference, so a chart re-registering on every render cannot loop.
const hasSameLineStyles = (
  current: Record<string, boolean> | undefined,
  next: Record<string, boolean>,
) =>
  current !== undefined &&
  Object.keys(current).length === Object.keys(next).length &&
  Object.entries(next).every(([resource, isDashed]) => current[resource] === isDashed);

const ChartLegendContext = createContext<ChartLegendState | null>(null);

export type ChartLegendWrapperProps = {
  children: ReactNode;
  colorSet:
    | Record<string, ChartColors | string>
    | ((seriesNames: string[]) => Record<string, ChartColors | string>);
  sortOrder?: 'alphabetical' | 'status' | ((a: string, b: string) => number);
  /** Optional display labels for legend items, keyed by resource name */
  labelMap?: Record<string, string>;
};

export const ChartLegendWrapper = ({
  children,
  colorSet,
  sortOrder = 'alphabetical',
  labelMap,
}: ChartLegendWrapperProps) => {
  const [registeredColorSets, setRegisteredColorSets] = useState<
    Record<string, string[]>
  >({});

  const [internalColorSet, setInternalColorSet] = useState<
    Record<string, ChartColors | string>
  >(() => {
    return typeof colorSet === 'function' ? {} : colorSet;
  });

  useEffect(() => {
    if (typeof colorSet === 'function') {
      const allUniqueSeriesNames = Array.from(
        new Set(Object.values(registeredColorSets).flat()),
      );

      if (allUniqueSeriesNames.length > 0) {
        const newColorSet = colorSet(allUniqueSeriesNames);
        setInternalColorSet(newColorSet);
      }
    } else {
      setInternalColorSet(colorSet);
    }
  }, [registeredColorSets, colorSet]);

  const allResources = useMemo(
    () => Object.keys(internalColorSet),
    [internalColorSet],
  );
  const [selectedResources, setSelectedResources] =
    useState<string[]>(allResources);

  useEffect(() => {
    setSelectedResources(allResources);
  }, [allResources]);

  const register = useCallback((chartId: string, seriesNames: string[]) => {
    setRegisteredColorSets((prev) => ({
      ...prev,
      [chartId]: seriesNames,
    }));
  }, []);

  const [lineStylesByChart, setLineStylesByChart] = useState<
    Record<string, Record<string, boolean>>
  >({});

  const registerLineStyles = useCallback(
    (chartId: string, isDashedByResource: Record<string, boolean>) => {
      setLineStylesByChart((prev) =>
        hasSameLineStyles(prev[chartId], isDashedByResource)
          ? prev
          : { ...prev, [chartId]: isDashedByResource },
      );
    },
    [],
  );

  const unregisterLineStyles = useCallback((chartId: string) => {
    setLineStylesByChart((prev) => {
      const { [chartId]: _unregistered, ...rest } = prev;
      return rest;
    });
  }, []);

  const isLineDashed = useCallback(
    (resource: string) => {
      const styles = Object.values(lineStylesByChart)
        .map((isDashedByResource) => isDashedByResource[resource])
        .filter((isDashed) => isDashed !== undefined);
      return styles.length > 0 && styles.every(Boolean);
    },
    [lineStylesByChart],
  );

  const addSelectedResource = useCallback((resource: string) => {
    setSelectedResources((prev) =>
      prev.includes(resource) ? prev : [...prev, resource],
    );
  }, []);

  const removeSelectedResource = useCallback((resource: string) => {
    setSelectedResources((prev) => prev.filter((r) => r !== resource));
  }, []);

  const selectAllResources = useCallback(() => {
    setSelectedResources(Object.keys(internalColorSet));
  }, [internalColorSet]);

  const selectOnlyResource = useCallback((resource: string) => {
    setSelectedResources([resource]);
  }, []);

  const isOnlyOneSelected = useCallback(() => {
    return selectedResources.length === 1;
  }, [selectedResources]);
  const isSelected = useCallback(
    (resource: string) => {
      return selectedResources.includes(resource);
    },
    [selectedResources],
  );

  const getColor = useCallback(
    (resource: string) => {
      const color = internalColorSet[resource];
      if (!color) {
        console.warn(
          `ChartLegendWrapper: No color defined for resource "${resource}"`,
        );
        return undefined;
      }
      return color;
    },
    [internalColorSet],
  );

  const getLabel = useCallback(
    (resource: string) => labelMap?.[resource] ?? resource,
    [labelMap],
  );

  const listResources = useCallback(() => {
    const resources = Object.keys(internalColorSet);

    if (sortOrder === 'alphabetical') {
      return resources.sort((a, b) => a.localeCompare(b));
    } else if (sortOrder === 'status') {
      return ['Success', 'Warning', 'Failed'].filter((status) =>
        resources.includes(status),
      );
    } else if (typeof sortOrder === 'function') {
      return resources.sort(sortOrder);
    }

    return resources;
  }, [internalColorSet, sortOrder]);

  const chartLegendState = useMemo(
    () => ({
      selectedResources,
      addSelectedResource,
      removeSelectedResource,
      selectAllResources,
      selectOnlyResource,
      isSelected,
      getColor,
      getLabel,
      listResources,
      isOnlyOneSelected,
      register,
      registerLineStyles,
      unregisterLineStyles,
      isLineDashed,
    }),
    [
      selectedResources,
      addSelectedResource,
      removeSelectedResource,
      selectAllResources,
      selectOnlyResource,
      isSelected,
      getColor,
      getLabel,
      listResources,
      isOnlyOneSelected,
      register,
      registerLineStyles,
      unregisterLineStyles,
      isLineDashed,
    ],
  );

  return (
    <ChartLegendContext.Provider value={chartLegendState}>
      {children}
    </ChartLegendContext.Provider>
  );
};

export const useChartLegend = () => {
  const context = useContext(ChartLegendContext);
  if (!context) {
    throw new Error('useChartLegend must be used within a ChartLegendWrapper');
  }
  return context;
};
