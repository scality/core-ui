import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useState } from 'react';
import { getWrapper } from '../../testUtils';
import { DataSchema } from './StackedBarChart.component';
import StackedBarLegend from './StackedBarLegend.component';

const StackedBarLegendWrapper = ({
  dataToDisplay,
}: {
  dataToDisplay: DataSchema['yValues'];
}) => {
  const [selectedLegend, setSelectedLegend] = useState<string | undefined>(
    undefined,
  );
  const { Wrapper } = getWrapper();
  return (
    <Wrapper>
      <StackedBarLegend
        selectedLegend={selectedLegend}
        setSelectedLegend={setSelectedLegend}
        dataToDisplay={dataToDisplay}
      />
    </Wrapper>
  );
};

describe('StackedBarLegend', () => {
  const selector = {
    legendItem: (label: string) =>
      screen.getByRole('button', { name: new RegExp(label, 'i') }),
  };
  it('should render', () => {
    render(
      <StackedBarLegendWrapper
        dataToDisplay={[{ key: 'label1', color: 'red' }]}
      />,
    );
    expect(screen.getByText(/label1/i)).toBeInTheDocument();
  });
  it('should render with label if provided', () => {
    render(
      <StackedBarLegendWrapper
        dataToDisplay={[{ key: 'label2', color: 'blue', label: 'Label 2' }]}
      />,
    );
    expect(screen.getByText(/Label 2/i)).toBeInTheDocument();
  });
  it('should allow selection and deselection of legend item', async () => {
    render(
      <StackedBarLegendWrapper
        dataToDisplay={[{ key: 'label3', color: 'green', label: 'Label 3' }]}
      />,
    );
    const legendItem = selector.legendItem('Label 3');
    expect(legendItem).toBeInTheDocument();
    expect(legendItem).toHaveAttribute('aria-pressed', 'false');
    expect(legendItem).toHaveAttribute(
      'aria-label',
      'Label 3 - not selected. Click to show only this series',
    );
    userEvent.click(legendItem);
    const legendItemClicked = selector.legendItem('Label 3');

    await waitFor(() => {
      expect(legendItemClicked).toHaveAttribute(
        'aria-label',
        'Label 3 - selected. Click to show all',
      );
      expect(legendItemClicked).toHaveAttribute('aria-pressed', 'true');
    });
    userEvent.click(legendItemClicked);
    const legendItemUnclicked = selector.legendItem('Label 3');
    await waitFor(() => {
      expect(legendItemUnclicked).toHaveAttribute(
        'aria-label',
        'Label 3 - not selected. Click to show only this series',
      );
      expect(legendItemUnclicked).toHaveAttribute('aria-pressed', 'false');
    });
  });
});
