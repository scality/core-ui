import { Meta, StoryObj } from '@storybook/react-webpack5';
import { ReactNode } from 'react';
import { useTheme } from 'styled-components';
import {
  Barchart,
  BarchartBars,
  ChartLegendWrapper,
} from '../../src/lib/components/charts';
import { Text } from '../../src/lib/components/text/Text.component';
import { CoreUITheme } from '../../src/lib/style/theme';

/**
 * The non-nominal states of a chart, rendered by the real Barchart rather than
 * drawn, so the guideline shows what the component actually does.
 *
 * The third panel is the gap: a query that succeeded and returned nothing
 * renders an empty frame, with no axes and no message. The component has no
 * prop for it, so it cannot say "no data for this period" the way it says
 * "chart data is not available" for a failure.
 */

const BARS = [
  {
    label: 'Used',
    data: [
      ['node-1', 12],
      ['node-2', 31],
      ['node-3', 22],
    ],
  },
] as const satisfies BarchartBars;

const Panel = ({
  caption,
  children,
}: {
  caption: string;
  children: ReactNode;
}) => (
  <div style={{ minWidth: 0 }}>
    <div style={{ marginBottom: '0.5rem' }}>
      <Text variant="Basic" color="textSecondary">
        {caption}
      </Text>
    </div>
    {children}
  </div>
);

const StateGrid = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
      gap: '2rem',
      width: '100%',
      maxWidth: 680,
    }}
  >
    {children}
  </div>
);

const useColorSet = () => {
  const theme = useTheme() as CoreUITheme;
  return { Used: theme.infoPrimary };
};

const ChartStatesDiagram = () => {
  const colorSet = useColorSet();

  return (
    <StateGrid>
      <Panel caption="Loading (isLoading)">
        <ChartLegendWrapper colorSet={colorSet}>
          <Barchart
            type={{ type: 'category' }}
            bars={BARS}
            isLoading
            title="Capacity by node (TiB)"
            height={180}
          />
        </ChartLegendWrapper>
      </Panel>

      <Panel caption="Error (isError)">
        <ChartLegendWrapper colorSet={colorSet}>
          <Barchart
            type={{ type: 'category' }}
            bars={BARS}
            isError
            title="Capacity by node (TiB)"
            height={180}
          />
        </ChartLegendWrapper>
      </Panel>

      <Panel caption="Empty (no message today)">
        <ChartLegendWrapper colorSet={colorSet}>
          <Barchart
            type={{ type: 'category' }}
            bars={[]}
            title="Capacity by node (TiB)"
            height={180}
          />
        </ChartLegendWrapper>
      </Panel>
    </StateGrid>
  );
};

const meta: Meta = {
  title: 'Guidelines/ChartsStates',
  tags: ['!dev', '!autodocs'],
};

export default meta;

export const ChartStates: StoryObj = {
  render: () => <ChartStatesDiagram />,
};
