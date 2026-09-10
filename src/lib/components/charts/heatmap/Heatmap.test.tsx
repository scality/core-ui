import React from 'react';
import { act, cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getWrapper } from '../../../testUtils';
import { ChartLegendWrapper } from '../legend/ChartLegendWrapper';
import { Heatmap, HeatmapRow } from './Heatmap';
import { DIMMED_CELL_OPACITY } from './Heatmap.utils';

const columns = [
  new Date('2026-08-25T10:00:00Z'),
  new Date('2026-08-25T10:05:00Z'),
  new Date('2026-08-25T10:10:00Z'),
];

const colorSet = {
  OK: 'green',
  WARNING: 'orange',
};

const statusRows: HeatmapRow<string>[] = [
  { label: 'Prometheus', cells: ['OK', 'WARNING', 'OK'] },
  { label: 'Grafana', cells: ['OK', 'OK', 'OK'] },
];

const renderStatusHeatmap = (
  props: Partial<React.ComponentProps<typeof Heatmap>> = {},
) => {
  const { Wrapper } = getWrapper();

  return render(
    <Heatmap
      title="Monitoring Services Status"
      legendTitle="Service Status"
      scale={{ colorSet }}
      rows={statusRows}
      columns={columns}
      {...props}
    />,
    { wrapper: Wrapper },
  );
};

describe('Heatmap', () => {
  describe('title and legend', () => {
    it('should render its own title and legend, from the colorSet it was given', () => {
      renderStatusHeatmap();

      expect(
        screen.getByText('Monitoring Services Status'),
      ).toBeInTheDocument();
      expect(screen.getByText('Service Status')).toBeInTheDocument();
      expect(screen.getByLabelText('OK selected')).toBeInTheDocument();
      expect(screen.getByLabelText('WARNING selected')).toBeInTheDocument();
    });

    it('should order the legend items the scale asked for', () => {
      renderStatusHeatmap({
        scale: {
          colorSet,
          sortOrder: (a, b) => b.localeCompare(a),
        },
      });

      const items = screen
        .getAllByLabelText(/selected$/)
        .map((item) => item.textContent);
      expect(items).toEqual(['WARNING', 'OK']);
    });

    it('should relabel the legend items through labelMap', () => {
      renderStatusHeatmap({
        scale: { colorSet, labelMap: { OK: 'Healthy' } },
      });

      expect(screen.getByText('Healthy')).toBeInTheDocument();
    });

    it('should drop the legend when the scale is stated elsewhere', () => {
      renderStatusHeatmap({ showLegend: false });

      expect(screen.queryByText('Service Status')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('OK selected')).not.toBeInTheDocument();
      // the grid itself is untouched
      expect(screen.getAllByRole('img')).toHaveLength(6);
    });

    it('should read a ChartLegendWrapper the caller owns when given no colorSet', () => {
      const { Wrapper } = getWrapper();

      render(
        <ChartLegendWrapper colorSet={colorSet}>
          <Heatmap rows={statusRows} columns={columns} showLegend={false} />
        </ChartLegendWrapper>,
        { wrapper: Wrapper },
      );

      expect(screen.getByLabelText('Prometheus WARNING')).toHaveStyle(
        'background-color: rgb(255, 165, 0)',
      );
    });
  });

  describe('discrete scale', () => {
    it('should render one cell per column and per row, and the row labels', () => {
      renderStatusHeatmap();

      expect(screen.getByText('Prometheus')).toBeInTheDocument();
      expect(screen.getByText('Grafana')).toBeInTheDocument();
      expect(screen.getAllByRole('img')).toHaveLength(6);
      expect(screen.getByLabelText('Prometheus WARNING')).toBeInTheDocument();
    });

    it('should color a cell with the color the legend holds for its value', () => {
      renderStatusHeatmap();

      expect(screen.getByLabelText('Prometheus WARNING')).toHaveStyle(
        'background-color: rgb(255, 165, 0)',
      );
      expect(screen.getAllByLabelText('Grafana OK')[0]).toHaveStyle(
        'background-color: rgb(0, 128, 0)',
      );
    });

    it('should register its values, so a colorSet function is told what to color', () => {
      const colorSetFn = jest.fn(() => colorSet);
      renderStatusHeatmap({ scale: { colorSet: colorSetFn } });

      expect(colorSetFn).toHaveBeenCalledWith(['OK', 'WARNING']);
    });

    it('should dim the cells of the values the legend filtered out', () => {
      renderStatusHeatmap();

      // clicking a legend item selects it alone
      userEvent.click(screen.getByText('OK'));

      expect(screen.getByLabelText('Prometheus WARNING')).toHaveStyle(
        `opacity: ${DIMMED_CELL_OPACITY}`,
      );
      expect(screen.getAllByLabelText('Grafana OK')[0]).toHaveStyle(
        'opacity: 1',
      );
    });
  });

  describe('empty cells', () => {
    it('should leave a slot empty rather than shift the rest of the grid', () => {
      renderStatusHeatmap({
        rows: [
          // a row shorter than the axis, and a hole in the middle of one
          { label: 'Short', cells: ['OK'] },
          { label: 'Holed', cells: ['OK', null, 'OK'] },
        ],
      });

      expect(screen.getAllByRole('img')).toHaveLength(3);
      expect(screen.getAllByLabelText('Short OK')).toHaveLength(1);
      expect(screen.getAllByLabelText('Holed OK')).toHaveLength(2);
    });
  });

  describe('continuous scale', () => {
    const numericRows: HeatmapRow<number>[] = [
      { label: 'cpu', cells: [0, 50, 100] },
    ];

    const renderNumericHeatmap = (
      scale: Partial<{ max: number; minOpacity: number }> = {},
      props = {},
    ) => {
      const { Wrapper } = getWrapper();

      return render(
        <Heatmap
          legendTitle="%"
          scale={{ type: 'continuous', colorRGB: '10,173,166', ...scale }}
          rows={numericRows}
          columns={columns}
          {...props}
        />,
        { wrapper: Wrapper },
      );
    };

    it('should ramp the opacity from the floor at 0 to 1 at the max', () => {
      renderNumericHeatmap({ minOpacity: 0.2 });

      expect(screen.getByLabelText('cpu 0')).toHaveStyle('opacity: 0.2');
      expect(screen.getByLabelText('cpu 50')).toHaveStyle('opacity: 0.6');
      expect(screen.getByLabelText('cpu 100')).toHaveStyle('opacity: 1');
      expect(screen.getByLabelText('cpu 100')).toHaveStyle(
        'background-color: rgb(10,173,166)',
      );
    });

    it('should ramp against a pinned max rather than the data', () => {
      renderNumericHeatmap({ max: 200, minOpacity: 0 });

      expect(screen.getByLabelText('cpu 100')).toHaveStyle('opacity: 0.5');
    });

    it('should state the domain it ramped against beside the grid', () => {
      renderNumericHeatmap();

      expect(screen.getByText('%')).toBeInTheDocument();
      expect(screen.getByText('100')).toBeInTheDocument();
      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('should spell the value out through formatValue', () => {
      renderNumericHeatmap(
        {},
        { formatValue: (value: number) => `${value} %` },
      );

      expect(screen.getByLabelText('cpu 100 %')).toBeInTheDocument();
    });
  });

  describe('tooltip', () => {
    it('should describe the cell on focus, so it is reachable from the keyboard', () => {
      renderStatusHeatmap();

      act(() => screen.getByLabelText('Prometheus WARNING').focus());

      const overlay = document.querySelector('.sc-tooltip-overlay');
      expect(overlay).not.toBeNull();
      expect(overlay).toHaveTextContent('Prometheus');
      expect(overlay).toHaveTextContent('WARNING');
    });

    it('should let the caller replace the tooltip content', () => {
      renderStatusHeatmap({
        renderTooltip: ({ row, columnIndex }) =>
          `${row.label} at column ${columnIndex}`,
      });

      act(() => screen.getByLabelText('Prometheus WARNING').focus());

      expect(document.querySelector('.sc-tooltip-overlay')).toHaveTextContent(
        'Prometheus at column 1',
      );
    });
  });

  describe('x-axis', () => {
    it('should thin the ticks out with labelEvery', () => {
      const tickCount = () =>
        screen.getAllByText(/^\d{2}:\d{2}$/, { exact: false }).length;

      renderStatusHeatmap();
      expect(tickCount()).toBe(3);

      cleanup();

      renderStatusHeatmap({ labelEvery: 2 });
      expect(tickCount()).toBe(2);
    });
  });
});
