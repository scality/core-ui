import '@fortawesome/fontawesome-free/css/all.css';
import './index.css';
export { Button } from './components/buttonv2/Buttonv2.component';
export { CopyButton } from './components/buttonv2/CopyButton.component';
export { Tabs, Tab } from './components/tabsv2/Tabsv2.component';
export { Table } from './components/tablev2/Tablev2.component';

// Keep MetricsTimeSpanProvider for backward compatibility (still used in external projects)
export {
  MetricsTimeSpanProvider,
  useMetricsTimeSpan,
} from './components/charts/MetricsTimeSpanProvider';

export { Select } from './components/selectv2/Selectv2.component';
export { HealthSelector } from './components/healthselectorv2/HealthSelector.component';
export { CoreUiThemeProvider } from './components/coreuithemeprovider/CoreUiThemeProvider';
export { Box } from './components/box/Box';
export { Input } from './components/inputv2/inputv2';
export { Accordion } from './components/accordion/Accordion.component';
export { Editor } from './components/editor';
export type { EditorProps } from './components/editor';

// Export all chart components from the consolidated charts folder
export {
  Barchart,
  BarchartTooltip,
  LineTimeSerieChart,
  GlobalHealthBar,
  Sparkline,
  ChartLegend,
  ChartLegendWrapper,
  useChartId,
  useChartLegend,
  ChartTooltipContainer,
  ChartTooltipItem,
  ChartTooltipHeader,
  ChartTooltipItemsContainer,
} from './components/charts';

export type {
  BarchartProps,
  BarchartBars,
  BarchartSortFn,
  BarchartTooltipFn,
  LineChartProps,
  Serie,
  GlobalHealthProps,
  Alert,
  UnitRange,
  TimeType,
  CategoryType,
} from './components/charts';

export type { CoreUITheme } from './style/theme';
