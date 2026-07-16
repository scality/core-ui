import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getWrapper } from '../../testUtils';
import { Button } from './Buttonv2.component';

const { Wrapper } = getWrapper();

describe('Button iconOnly', () => {
  it('stays reachable and clickable by its label when set to collapse below a width', async () => {
    const onClick = jest.fn();
    render(
      <Button
        variant="primary"
        icon={<span aria-hidden>+</span>}
        label="Create"
        iconOnly={480}
        onClick={onClick}
      />,
      { wrapper: Wrapper },
    );
    const button = screen.getByRole('button', { name: 'Create' });
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('stays reachable by its label when always collapsed to icon-only', () => {
    render(
      <Button
        variant="primary"
        icon={<span aria-hidden>+</span>}
        label="Delete"
        iconOnly
      />,
      { wrapper: Wrapper },
    );
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
  });
});
