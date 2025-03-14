import { render, screen } from '@testing-library/react';
import React, { useState } from 'react';
import { Accordion } from './Accordion.component';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from 'react-query';

describe('Accordion', () => {
  const selectors = {
    accordionToggle: () => screen.getByRole('button'),
    accordionContainer: () => screen.getByRole('region'),
    accordionContent: () => screen.queryByText(/Test content/i),
  };
  const renderAccordion = (open = false) => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Accordion title="Advanced Testings" id="test-accordion" open={open}>
          <div>Test content</div>
        </Accordion>
      </QueryClientProvider>,
    );
  };
  it('should render the Accordion component with title and content', () => {
    renderAccordion();

    const accordionToggle = selectors.accordionToggle();
    expect(accordionToggle).toBeInTheDocument();
    const accordionContent = selectors.accordionContent();
    expect(accordionContent).toBeInTheDocument();
  });

  it('should toggle the content when clicking on the accordion header', () => {
    renderAccordion();
    const accordionToggle = selectors.accordionToggle();
    const accordionContent = selectors.accordionContent();
    expect(accordionContent).not.toBeVisible();
    userEvent.click(accordionToggle);
    expect(accordionContent).toBeVisible();
  });

  it('should toggle the content when pressing the enter key or space key on the accordion header', () => {
    renderAccordion();
    const accordionToggle = selectors.accordionToggle();
    const accordionContent = selectors.accordionContent();
    expect(accordionContent).not.toBeVisible();
    accordionToggle.focus();
    userEvent.keyboard('{enter}');
    expect(accordionContent).toBeVisible();
    userEvent.keyboard('{space}');
    expect(accordionContent).not.toBeVisible();
  });

  it('should toggle the content when open prop changes', () => {
    const queryClient = new QueryClient();
    const TestWrapper = () => {
      const [isOpen, setisOpen] = useState(false);
      return (
        <>
          <button onClick={() => setisOpen(!isOpen)}>Test button</button>
          <Accordion
            title="Advanced Testings"
            id="test-accordion"
            open={isOpen}
          >
            <div>Test content</div>
          </Accordion>
        </>
      );
    };

    render(
      <QueryClientProvider client={queryClient}>
        <TestWrapper />
      </QueryClientProvider>,
    );

    userEvent.click(screen.getByRole('button', { name: /Test button/i }));
    expect(selectors.accordionContent()).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: /Test button/i }));
    expect(selectors.accordionContent()).not.toBeVisible();
  });
});
