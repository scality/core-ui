import { render, screen } from '@testing-library/react';
import { ChartLegend } from './ChartLegend';
import React from 'react';
import { ChartLegendWrapper } from './ChartLegendWrapper';
import userEvent from '@testing-library/user-event';

const colorSet = {
  CPU: 'red',
  Memory: 'blue',
  Disk: 'green',
};

describe('ChartLegend', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Initial State', () => {
    it('should render all legend items', () => {
      render(
        <ChartLegendWrapper colorSet={colorSet}>
          <ChartLegend shape="line" />
        </ChartLegendWrapper>,
      );
      expect(screen.getByText('CPU')).toBeInTheDocument();
      expect(screen.getByText('Memory')).toBeInTheDocument();
      expect(screen.getByText('Disk')).toBeInTheDocument();
    });

    it('should have all items selected by default', () => {
      render(
        <ChartLegendWrapper colorSet={colorSet}>
          <ChartLegend shape="line" />
        </ChartLegendWrapper>,
      );

      expect(screen.getByLabelText('CPU selected')).toBeInTheDocument();
      expect(screen.getByLabelText('Memory selected')).toBeInTheDocument();
      expect(screen.getByLabelText('Disk selected')).toBeInTheDocument();
    });
  });

  describe('Normal Click Behavior', () => {
    it('should select only clicked item when all are selected', () => {
      render(
        <ChartLegendWrapper colorSet={colorSet}>
          <ChartLegend shape="line" />
        </ChartLegendWrapper>,
      );
      expect(screen.getByLabelText('CPU selected')).toBeInTheDocument();
      expect(screen.getByLabelText('Memory selected')).toBeInTheDocument();
      expect(screen.getByLabelText('Disk selected')).toBeInTheDocument();

      // Click on CPU should select only CPU
      userEvent.click(screen.getByLabelText('CPU selected'));

      expect(screen.getByLabelText('CPU selected')).toBeInTheDocument();
      expect(screen.getByLabelText('Memory not selected')).toBeInTheDocument();
      expect(screen.getByLabelText('Disk not selected')).toBeInTheDocument();
    });

    it('should select all items when clicking on the only selected item', () => {
      render(
        <ChartLegendWrapper colorSet={colorSet}>
          <ChartLegend shape="line" />
        </ChartLegendWrapper>,
      );

      // First click to select only CPU
      userEvent.click(screen.getByLabelText('CPU selected'));

      // Second click should select all
      userEvent.click(screen.getByLabelText('CPU selected'));

      expect(screen.getByLabelText('CPU selected')).toBeInTheDocument();
      expect(screen.getByLabelText('Memory selected')).toBeInTheDocument();
      expect(screen.getByLabelText('Disk selected')).toBeInTheDocument();
    });

    it('should select only clicked item when clicking unselected item', () => {
      render(
        <ChartLegendWrapper colorSet={colorSet}>
          <ChartLegend shape="line" />
        </ChartLegendWrapper>,
      );

      // Select only CPU first
      userEvent.click(screen.getByLabelText('CPU selected'));
      expect(screen.getByLabelText('CPU selected')).toBeInTheDocument();
      expect(screen.getByLabelText('Memory not selected')).toBeInTheDocument();

      // Click on unselected Memory should select only Memory
      userEvent.click(screen.getByText('Memory'));
      expect(screen.getByLabelText('CPU not selected')).toBeInTheDocument();
      expect(screen.getByLabelText('Memory selected')).toBeInTheDocument();
      expect(screen.getByLabelText('Disk not selected')).toBeInTheDocument();
    });
  });

  describe('Cmd+Click Behavior', () => {
    it('should add unselected item to selection when cmd+clicking', () => {
      render(
        <ChartLegendWrapper colorSet={colorSet}>
          <ChartLegend shape="line" />
        </ChartLegendWrapper>,
      );

      // Select only CPU first
      userEvent.click(screen.getByText('CPU'));
      expect(screen.getByLabelText('CPU selected')).toBeInTheDocument();
      expect(screen.getByLabelText('Memory not selected')).toBeInTheDocument();

      // Cmd+click Memory should add it to selection
      userEvent.click(screen.getByText('Memory'), { metaKey: true });
      expect(screen.getByLabelText('CPU selected')).toBeInTheDocument();
      expect(screen.getByLabelText('Memory selected')).toBeInTheDocument();
      expect(screen.getByLabelText('Disk not selected')).toBeInTheDocument();
    });

    it('should remove selected item from selection when cmd+clicking with multiple selected', () => {
      render(
        <ChartLegendWrapper colorSet={colorSet}>
          <ChartLegend shape="line" />
        </ChartLegendWrapper>,
      );

      // Start with all selected, select only CPU, then add Memory
      userEvent.click(screen.getByText('CPU'));
      userEvent.click(screen.getByText('Memory'), { metaKey: true });

      expect(screen.getByLabelText('CPU selected')).toBeInTheDocument();
      expect(screen.getByLabelText('Memory selected')).toBeInTheDocument();
      expect(screen.getByLabelText('Disk not selected')).toBeInTheDocument();

      // Cmd+click CPU should remove it
      userEvent.click(screen.getByText('CPU'), { metaKey: true });
      expect(screen.getByLabelText('CPU not selected')).toBeInTheDocument();
      expect(screen.getByLabelText('Memory selected')).toBeInTheDocument();
      expect(screen.getByLabelText('Disk not selected')).toBeInTheDocument();
    });

    it('should select all when cmd+clicking the only selected item', () => {
      render(
        <ChartLegendWrapper colorSet={colorSet}>
          <ChartLegend shape="line" />
        </ChartLegendWrapper>,
      );

      // Select only CPU
      userEvent.click(screen.getByText('CPU'));
      expect(screen.getByLabelText('CPU selected')).toBeInTheDocument();
      expect(screen.getByLabelText('Memory not selected')).toBeInTheDocument();
      expect(screen.getByLabelText('Disk not selected')).toBeInTheDocument();

      // Cmd+click the only selected item should select all
      userEvent.click(screen.getByText('CPU'), { metaKey: true });
      expect(screen.getByLabelText('CPU selected')).toBeInTheDocument();
      expect(screen.getByLabelText('Memory selected')).toBeInTheDocument();
      expect(screen.getByLabelText('Disk selected')).toBeInTheDocument();
    });

    it('should work with ctrl+click on Windows/Linux', () => {
      render(
        <ChartLegendWrapper colorSet={colorSet}>
          <ChartLegend shape="line" />
        </ChartLegendWrapper>,
      );

      // Select only CPU first
      userEvent.click(screen.getByText('CPU'));

      // Ctrl+click Memory should add it to selection
      userEvent.click(screen.getByText('Memory'), { ctrlKey: true });
      expect(screen.getByLabelText('CPU selected')).toBeInTheDocument();
      expect(screen.getByLabelText('Memory selected')).toBeInTheDocument();
      expect(screen.getByLabelText('Disk not selected')).toBeInTheDocument();
    });

    it('should handle mixed normal and cmd+clicks correctly', () => {
      render(
        <ChartLegendWrapper colorSet={colorSet}>
          <ChartLegend shape="line" />
        </ChartLegendWrapper>,
      );

      // Normal click to select CPU only
      userEvent.click(screen.getByText('CPU'));
      expect(screen.getByLabelText('CPU selected')).toBeInTheDocument();
      expect(screen.getByLabelText('Memory not selected')).toBeInTheDocument();

      // Cmd+click to add Memory
      userEvent.click(screen.getByText('Memory'), { metaKey: true });
      expect(screen.getByLabelText('CPU selected')).toBeInTheDocument();
      expect(screen.getByLabelText('Memory selected')).toBeInTheDocument();

      // Normal click on Disk should select only Disk
      userEvent.click(screen.getByText('Disk'));
      expect(screen.getByLabelText('CPU not selected')).toBeInTheDocument();
      expect(screen.getByLabelText('Memory not selected')).toBeInTheDocument();
      expect(screen.getByLabelText('Disk selected')).toBeInTheDocument();
    });
  });

  it('should not respond to clicks when disabled', () => {
    render(
      <ChartLegendWrapper colorSet={colorSet}>
        <ChartLegend shape="line" disabled />
      </ChartLegendWrapper>,
    );

    userEvent.click(screen.getByText('CPU'));
    userEvent.click(screen.getByText('Memory'), { metaKey: true });

    expect(screen.getByLabelText('CPU selected')).toBeInTheDocument();
    expect(screen.getByLabelText('Memory selected')).toBeInTheDocument();
  });
});
