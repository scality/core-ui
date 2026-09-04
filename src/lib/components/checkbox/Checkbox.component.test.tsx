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

  // jsdom has no layout, so the geometry is proven by the WrappedLabel story.
  // What is worth asserting here is that reserving the icon's room did not push
  // the affordance out of the label it annotates.
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

  // Deliberately no test for the box being named after its label rather than
  // after the help affordance: jsdom's name computation stops short of the nested
  // button, so it reports the clean name whether the `aria-labelledby` is wired or
  // not. A test that passes with the fix removed is not a guard -- the WrappedLabel
  // story is the evidence.

  it('renders no help affordance without a label to annotate', () => {
    render(<Checkbox labelHelpTooltip="Nothing to attach this to." />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
