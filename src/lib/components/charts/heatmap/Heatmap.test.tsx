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
      expect(screen.getAllByRole('gridcell')).toHaveLength(6);
    });

    it('should read a ChartLegendWrapper the caller owns when given no colorSet', () => {
      const { Wrapper } = getWrapper();

      render(
        <ChartLegendWrapper colorSet={colorSet}>
          <Heatmap rows={statusRows} columns={columns} showLegend={false} />
        </ChartLegendWrapper>,
        { wrapper: Wrapper },
      );

      expect(
        screen.getByLabelText('Prometheus, 25 Aug 10:05 to 10:10, WARNING'),
      ).toHaveStyle('background-color: rgb(255, 165, 0)');
    });
  });

  describe('discrete scale', () => {
    it('should render one cell per column and per row, and the row labels', () => {
      renderStatusHeatmap();

      expect(screen.getByText('Prometheus')).toBeInTheDocument();
      expect(screen.getByText('Grafana')).toBeInTheDocument();
      expect(screen.getAllByRole('gridcell')).toHaveLength(6);
      expect(
        screen.getByLabelText('Prometheus, 25 Aug 10:05 to 10:10, WARNING'),
      ).toBeInTheDocument();
    });

    it('should color a cell with the color the legend holds for its value', () => {
      renderStatusHeatmap();

      expect(
        screen.getByLabelText('Prometheus, 25 Aug 10:05 to 10:10, WARNING'),
      ).toHaveStyle('background-color: rgb(255, 165, 0)');
      expect(
        screen.getByLabelText('Grafana, 25 Aug 10:00 to 10:05, OK'),
      ).toHaveStyle('background-color: rgb(0, 128, 0)');
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

      expect(
        screen.getByLabelText('Prometheus, 25 Aug 10:05 to 10:10, WARNING'),
      ).toHaveStyle(`opacity: ${DIMMED_CELL_OPACITY}`);
      expect(
        screen.getByLabelText('Grafana, 25 Aug 10:00 to 10:05, OK'),
      ).toHaveStyle('opacity: 1');
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

      // every slot is a cell of its row, painted or not, so the columns stay
      // aligned for anyone stepping through them
      expect(screen.getAllByRole('gridcell')).toHaveLength(6);
      expect(screen.getAllByLabelText(/^Short, /)).toHaveLength(1);
      expect(screen.getAllByLabelText(/^Holed, /)).toHaveLength(2);
    });
  });

  describe('formatValue', () => {
    it('should spell the value out in the aria-label', () => {
      renderStatusHeatmap({
        formatValue: (value: string) => `status ${value.toLowerCase()}`,
      });

      expect(
        screen.getByLabelText(
          'Prometheus, 25 Aug 10:05 to 10:10, status warning',
        ),
      ).toBeInTheDocument();
    });
  });

  describe('assistive structure', () => {
    it('should expose the grid as named rows of cells', () => {
      renderStatusHeatmap();

      expect(screen.getByRole('grid')).toBeInTheDocument();
      // two rows of data, plus the x-axis
      expect(screen.getAllByRole('row')).toHaveLength(3);
      // the visible label column stands outside the grid, so the row carries
      // the name rather than a screen reader hearing it from both
      expect(
        screen.getByRole('row', { name: 'Prometheus' }),
      ).toBeInTheDocument();
      expect(screen.getAllByRole('columnheader')).toHaveLength(columns.length);
    });

    it('should announce a cell with its row, its slot and its value', () => {
      renderStatusHeatmap();

      // the slot is the part a screen reader cannot get from anywhere else:
      // without it the columns have to be counted to find out when this was
      expect(
        screen.getByRole('gridcell', {
          name: 'Prometheus, 25 Aug 10:05 to 10:10, WARNING',
        }),
      ).toBeInTheDocument();
    });
  });

  describe('tooltip', () => {
    it('should describe the cell on focus, so it is reachable from the keyboard', () => {
      renderStatusHeatmap();

      act(() =>
        screen
          .getByLabelText('Prometheus, 25 Aug 10:05 to 10:10, WARNING')
          .focus(),
      );

      const overlay = document.querySelector('.sc-tooltip-overlay');
      expect(overlay).not.toBeNull();
      expect(overlay).toHaveTextContent('Prometheus');
      expect(overlay).toHaveTextContent('WARNING');
    });

    it('should name the whole slot, not the instant the column opens', () => {
      renderStatusHeatmap();

      act(() =>
        screen
          .getByLabelText('Prometheus, 25 Aug 10:05 to 10:10, WARNING')
          .focus(),
      );

      // the axis is five-minute slots, and the cell has to say so on its own
      expect(document.querySelector('.sc-tooltip-overlay')).toHaveTextContent(
        '25 Aug 10:05 to 10:10',
      );
    });

    it('should repeat the date when the slot runs into the next day', () => {
      renderStatusHeatmap({
        columns: [
          new Date('2026-08-31T23:00:00Z'),
          new Date('2026-09-01T00:00:00Z'),
        ],
        rows: [{ label: 'Prometheus', cells: ['OK', 'OK'] }],
      });

      act(() =>
        screen
          .getByLabelText('Prometheus, 31 Aug 23:00 to 01 Sep 00:00, OK')
          .focus(),
      );

      // without the date the slot would read "31 Aug 23:00 to 00:00"
      expect(document.querySelector('.sc-tooltip-overlay')).toHaveTextContent(
        '31 Aug 23:00 to 01 Sep 00:00',
      );
    });

    it('should name both days of a slot a whole day long', () => {
      renderStatusHeatmap({
        columns: [
          new Date('2026-08-31T00:00:00Z'),
          new Date('2026-09-01T00:00:00Z'),
        ],
        rows: [{ label: 'Prometheus', cells: ['OK', 'OK'] }],
      });

      act(() =>
        screen
          .getByLabelText('Prometheus, 31 Aug 00:00 to 01 Sep 00:00, OK')
          .focus(),
      );

      // the end is midnight too, so only the date tells the two apart
      expect(document.querySelector('.sc-tooltip-overlay')).toHaveTextContent(
        '31 Aug 00:00 to 01 Sep 00:00',
      );
    });

    it('should fall back to the start alone when the axis has one column', () => {
      renderStatusHeatmap({
        columns: [columns[0]],
        rows: [{ label: 'Prometheus', cells: ['OK'] }],
      });

      act(() => screen.getByLabelText('Prometheus, 25 Aug 10:00, OK').focus());

      const overlay = document.querySelector('.sc-tooltip-overlay');
      expect(overlay).toHaveTextContent('25 Aug 10:00');
      expect(overlay).not.toHaveTextContent('to');
    });

    it('should let the caller replace the tooltip content', () => {
      renderStatusHeatmap({
        renderTooltip: ({ row, columnIndex }) =>
          `${row.label} at column ${columnIndex}`,
      });

      act(() =>
        screen
          .getByLabelText('Prometheus, 25 Aug 10:05 to 10:10, WARNING')
          .focus(),
      );

      expect(document.querySelector('.sc-tooltip-overlay')).toHaveTextContent(
        'Prometheus at column 1',
      );
    });
  });

  describe('x-axis', () => {
    it('should label a daily axis by date rather than by time of day', () => {
      renderStatusHeatmap({
        columns: [
          new Date('2026-08-25T00:00:00Z'),
          new Date('2026-08-26T00:00:00Z'),
          new Date('2026-08-27T00:00:00Z'),
        ],
      });

      // by time of day the three columns would all read "00:00"
      expect(screen.getByText('25 Aug')).toBeInTheDocument();
      expect(screen.getByText('26 Aug')).toBeInTheDocument();
      expect(screen.getByText('27 Aug')).toBeInTheDocument();
    });

    it('should let the caller override the default tick', () => {
      renderStatusHeatmap({
        formatColumnTick: (column: Date) => `slot ${column.getUTCMinutes()}`,
      });

      expect(screen.getByText('slot 5')).toBeInTheDocument();
    });

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
