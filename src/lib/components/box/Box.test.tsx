import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Box } from './Box';
import { Stack } from '../../spacing';

describe('Box', () => {
  it('keeps design-system style props out of the rendered HTML', () => {
    // Under styled-components v6 (which forwards unknown props to the DOM),
    // Box must filter its open-ended styled-system props so they never surface
    // as invalid HTML attributes on the element.
    render(
      <Box
        mt={2}
        bg="backgroundLevel1"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
        data-testid="b"
      />,
    );
    const el = screen.getByTestId('b');
    expect(el.hasAttribute('mt')).toBe(false);
    expect(el.hasAttribute('bg')).toBe(false);
    expect(el.hasAttribute('flexDirection')).toBe(false);
    expect(el.hasAttribute('flexdirection')).toBe(false);
    expect(el.hasAttribute('alignItems')).toBe(false);
    expect(el.hasAttribute('justifyContent')).toBe(false);
  });

  it('forwards accessibility attributes and click handlers to the element', async () => {
    const onClick = jest.fn();
    render(
      <Box
        id="my-box"
        role="region"
        aria-label="a box"
        data-custom="keep"
        onClick={onClick}
        data-testid="b"
      />,
    );
    const el = screen.getByTestId('b');
    expect(el.getAttribute('id')).toBe('my-box');
    expect(el.getAttribute('role')).toBe('region');
    expect(el.getAttribute('aria-label')).toBe('a box');
    expect(el.getAttribute('data-custom')).toBe('keep');
    await userEvent.click(el);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders as the element given by the "as" prop', () => {
    render(<Box as="section" data-testid="b" />);
    expect(screen.getByTestId('b').tagName).toBe('SECTION');
  });
});

describe('Box container', () => {
  it('still shows its children when opted into being a responsive container', () => {
    render(
      <Stack container>
        <span>panel content</span>
      </Stack>,
    );
    expect(screen.getByText('panel content')).toBeVisible();
  });

  it('does not emit the container prop as a DOM attribute', () => {
    render(<Box container data-testid="c" />);
    const el = screen.getByTestId('c');
    expect(el.hasAttribute('container')).toBe(false);
  });
});
