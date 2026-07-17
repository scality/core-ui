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

  it('warns when collapsing a non-string label that leaves no accessible name', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    try {
      render(
        <Button
          variant="primary"
          icon={<span aria-hidden>+</span>}
          label={<span>Create</span>}
          iconOnly
        />,
        { wrapper: Wrapper },
      );
      expect(warn).toHaveBeenCalledWith(
        expect.stringContaining('no accessible name'),
      );
    } finally {
      warn.mockRestore();
    }
  });

  it('uses a string tooltip overlay as the accessible name when a non-string label is collapsed', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    try {
      render(
        <Button
          variant="primary"
          icon={<span aria-hidden>+</span>}
          label={<span>Create</span>}
          iconOnly
          tooltip={{ overlay: 'Create' }}
        />,
        { wrapper: Wrapper },
      );
      expect(warn).not.toHaveBeenCalled();
      expect(
        screen.getByRole('button', { name: 'Create' }),
      ).toBeInTheDocument();
    } finally {
      warn.mockRestore();
    }
  });

  it('warns when a non-string label is collapsed with only a non-string tooltip overlay', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    try {
      render(
        <Button
          variant="primary"
          icon={<span aria-hidden>+</span>}
          label={<span>Create</span>}
          iconOnly
          tooltip={{ overlay: <span>Create</span> }}
        />,
        { wrapper: Wrapper },
      );
      expect(warn).toHaveBeenCalledWith(
        expect.stringContaining('no accessible name'),
      );
    } finally {
      warn.mockRestore();
    }
  });

  it('does not warn when a non-string label is collapsed but an aria-label is provided', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    try {
      render(
        <Button
          variant="primary"
          icon={<span aria-hidden>+</span>}
          label={<span>Create</span>}
          iconOnly
          aria-label="Create"
        />,
        { wrapper: Wrapper },
      );
      expect(warn).not.toHaveBeenCalled();
      expect(
        screen.getByRole('button', { name: 'Create' }),
      ).toBeInTheDocument();
    } finally {
      warn.mockRestore();
    }
  });
});
