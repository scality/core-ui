import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { getWrapper } from '../../testUtils';
import { ConstrainedText } from './Constrainedtext.component';

describe('ConstrainedText', () => {
  const { Wrapper } = getWrapper();

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

  it('should not wrap with tooltip when text is not truncated', () => {
    // JSDOM returns 0 for both offsetWidth and scrollWidth by default,
    // so isEllipsisActive returns false and no tooltip wrapper is rendered.
    render(<ConstrainedText text="short text" />, { wrapper: Wrapper });
    expect(document.querySelector('.sc-tooltip')).not.toBeInTheDocument();
  });

  it('should wrap with tooltip when text overflows horizontally', () => {
    jest
      .spyOn(HTMLElement.prototype, 'scrollWidth', 'get')
      .mockReturnValue(200);
    jest
      .spyOn(HTMLElement.prototype, 'offsetWidth', 'get')
      .mockReturnValue(100);

    render(
      <ConstrainedText text="very long text that does not fit in its container" />,
      { wrapper: Wrapper },
    );

    expect(document.querySelector('.sc-tooltip')).toBeInTheDocument();
  });

  it('should wrap with tooltip when text overflows vertically (lineClamp > 1)', () => {
    jest
      .spyOn(HTMLElement.prototype, 'scrollHeight', 'get')
      .mockReturnValue(80);
    jest
      .spyOn(HTMLElement.prototype, 'offsetHeight', 'get')
      .mockReturnValue(40);

    render(
      <ConstrainedText
        text="very long text that does not fit in its container"
        lineClamp={2}
      />,
      { wrapper: Wrapper },
    );

    expect(document.querySelector('.sc-tooltip')).toBeInTheDocument();
  });
});
