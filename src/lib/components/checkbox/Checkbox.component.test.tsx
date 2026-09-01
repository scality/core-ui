import { render as rtlRender, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { ReactElement } from 'react';
import { CoreUiThemeProvider } from '../coreuithemeprovider/CoreUiThemeProvider';
import { coreUIAvailableThemes } from '../../style/theme';
import { Checkbox } from './Checkbox.component';

const render = (ui: ReactElement) =>
  rtlRender(
    <CoreUiThemeProvider theme={coreUIAvailableThemes.darkRebrand}>
      {ui}
    </CoreUiThemeProvider>,
  );

describe('Checkbox', () => {
  it('toggles when the label is clicked', async () => {
    const onChange = jest.fn();
    render(<Checkbox label="Enable versioning" onChange={onChange} />);

    await userEvent.click(screen.getByText('Enable versioning'));

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  // The label's DOM shape carries the help icon's reserved room, so it is
  // layout-bearing and easy to break silently. jsdom has no layout, so the
  // geometry is proven by the WrappedLabel story -- what is worth asserting here
  // is that reserving that room did not push the affordance out of the label it
  // annotates.
  it('keeps the help affordance inside the label it annotates', () => {
    render(
      <Checkbox
        label="Delete objects after replication"
        labelHelpTooltip="Objects are removed from the source only once the destination confirms the write."
      />,
    );

    const help = screen.getByRole('button', { name: 'More information' });
    expect(
      screen.getByText('Delete objects after replication').closest('label'),
    ).toContainElement(help);
  });

  // There is deliberately no test here for the box being named after its label
  // rather than after the help affordance, even though that is what the
  // `aria-labelledby` in the component is for. jsdom's name computation stops
  // short of the nested help button, so it reports the clean name whether the
  // wiring is there or not -- checked by removing the `aria-labelledby`, and
  // again by moving its target to the wrapper that holds the icon: every test
  // here stays green through both. A test that passes with the fix removed is
  // not a guard. Chrome's accessibility tree on the WrappedLabel story is the
  // evidence instead.

  it('renders no help affordance without a label to annotate', () => {
    render(<Checkbox labelHelpTooltip="Nothing to attach this to." />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
