import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { getWrapper } from '../../testUtils';
import { ConstrainedText } from './Constrainedtext.component';

describe('ConstrainedText', () => {
  const { Wrapper } = getWrapper();
  const overflowingText = 'very long text that does not fit in its container';

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render text content', () => {
    render(<ConstrainedText text="Hello world" />, { wrapper: Wrapper });
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('should render numeric content', () => {
    render(<ConstrainedText text={42} />, { wrapper: Wrapper });
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('should render JSX content', () => {
    render(
      <ConstrainedText text={<span data-testid="inner">inner content</span>} />,
      { wrapper: Wrapper },
    );
    expect(screen.getByTestId('inner')).toBeInTheDocument();
  });

  it('should not wrap with tooltip when text is not truncated', async () => {
    // JSDOM returns 0 for both offsetWidth and scrollWidth by default,
    // so isEllipsisActive returns false and no tooltip wrapper is rendered.
    render(<ConstrainedText text="short text" />, { wrapper: Wrapper });

    await userEvent.hover(screen.getByText('short text'));

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('should show the full text in a tooltip when it overflows horizontally', async () => {
    jest
      .spyOn(HTMLElement.prototype, 'scrollWidth', 'get')
      .mockReturnValue(200);
    jest
      .spyOn(HTMLElement.prototype, 'offsetWidth', 'get')
      .mockReturnValue(100);

    render(<ConstrainedText text={overflowingText} />, { wrapper: Wrapper });

    await userEvent.hover(screen.getByText(overflowingText));

    expect(screen.getByRole('tooltip')).toHaveTextContent(overflowingText);
  });

  it('should show the full text in a tooltip when it overflows vertically (lineClamp > 1)', async () => {
    jest
      .spyOn(HTMLElement.prototype, 'scrollHeight', 'get')
      .mockReturnValue(80);
    jest
      .spyOn(HTMLElement.prototype, 'offsetHeight', 'get')
      .mockReturnValue(40);

    render(<ConstrainedText text={overflowingText} lineClamp={2} />, {
      wrapper: Wrapper,
    });

    await userEvent.hover(screen.getByText(overflowingText));

    expect(screen.getByRole('tooltip')).toHaveTextContent(overflowingText);
  });
});
