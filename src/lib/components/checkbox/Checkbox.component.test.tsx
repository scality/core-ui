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

// No test for the box being named after its label rather than after the help
// affordance: jsdom's name computation stops short of the nested button and
// reports the clean name whether the `aria-labelledby` is wired or not.
describe('Checkbox', () => {
  it('toggles when the label is clicked', async () => {
    const onChange = jest.fn();
    render(<Checkbox label="Enable versioning" onChange={onChange} />);

    await userEvent.click(screen.getByText('Enable versioning'));

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  /**
   * A trailing space is a soft-wrap opportunity in front of the room reserved for
   * the help icon, which drops the icon onto a line of its own. jsdom has no
   * layout, so what is pinned here is the trim itself -- with an identity
   * normalizer, since the default one would collapse the space away.
   */
  it('strips a trailing space from a label that carries a help icon', () => {
    render(
      <Checkbox
        label="Platform Admin "
        labelHelpTooltip="Can manage users and groups."
      />,
    );

    expect(
      screen.getByText('Platform Admin', { normalizer: (text) => text }),
    ).toBeInTheDocument();
  });

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
});
