import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getWrapper } from '../../testUtils';
import { Input } from './inputv2';

const { Wrapper } = getWrapper();

describe('Input fluid', () => {
  it('remains visible and editable when fluid is enabled', async () => {
    render(<Input id="q" fluid aria-label="Search" />, { wrapper: Wrapper });
    const input = screen.getByRole('textbox', { name: 'Search' });
    expect(input).toBeVisible();
    await userEvent.type(input, 'abc');
    expect(input).toHaveValue('abc');
  });
});
