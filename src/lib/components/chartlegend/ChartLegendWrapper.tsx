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
import { ChartColors } from '../../style/theme';

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
  listResources: () => string[];
  isOnlyOneSelected: () => boolean;
  register: (chartId: string, seriesNames: string[]) => void;
};

const ChartLegendContext = createContext<ChartLegendState | null>(null);

export type ChartLegendWrapperProps = {
  children: ReactNode;
  colorSet:
    | Record<string, ChartColors | string>
    | ((seriesNames: string[]) => Record<string, ChartColors | string>);
};

export const ChartLegendWrapper = ({
  children,
  colorSet,
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

  const listResources = useCallback(() => {
    return Object.keys(internalColorSet);
  }, [internalColorSet]);

  const chartLegendState = useMemo(
    () => ({
      selectedResources,
      addSelectedResource,
      removeSelectedResource,
      selectAllResources,
      selectOnlyResource,
      isSelected,
      getColor,
      listResources,
      isOnlyOneSelected,
      register,
    }),
    [
      selectedResources,
      addSelectedResource,
      removeSelectedResource,
      selectAllResources,
      selectOnlyResource,
      isSelected,
      getColor,
      listResources,
      isOnlyOneSelected,
      register,
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
