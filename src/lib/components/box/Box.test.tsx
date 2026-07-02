import { render } from '@testing-library/react';
import { Box } from './Box';

describe('Box', () => {
  it('applies spacing and layout styles without exposing them as DOM attributes', () => {
    const { container } = render(
      <Box
        mt={2}
        bg="backgroundLevel1"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
        data-testid="b"
      />,
    );
    const el = container.querySelector('[data-testid="b"]')!;
    expect(el.hasAttribute('mt')).toBe(false);
    expect(el.hasAttribute('bg')).toBe(false);
    expect(el.hasAttribute('flexDirection')).toBe(false);
    expect(el.hasAttribute('flexdirection')).toBe(false);
    expect(el.hasAttribute('alignItems')).toBe(false);
    expect(el.hasAttribute('justifyContent')).toBe(false);
  });

  it('still forwards genuine DOM attributes and event handlers to the element', () => {
    const onClick = jest.fn();
    const { container } = render(
      <Box
        id="my-box"
        role="region"
        aria-label="a box"
        data-custom="keep"
        onClick={onClick}
        data-testid="b"
      />,
    );
    const el = container.querySelector('[data-testid="b"]')!;
    expect(el.getAttribute('id')).toBe('my-box');
    expect(el.getAttribute('role')).toBe('region');
    expect(el.getAttribute('aria-label')).toBe('a box');
    expect(el.getAttribute('data-custom')).toBe('keep');
    (el as HTMLElement).click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders as a different element via the polymorphic "as" prop', () => {
    const { container } = render(<Box as="section" data-testid="b" />);
    expect(container.querySelector('section[data-testid="b"]')).not.toBeNull();
  });
});
