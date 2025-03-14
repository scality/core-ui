import { render, screen } from '@testing-library/react';
import React from 'react';
import { Accordion } from './Accordion.component';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from 'react-query';

describe('Accordion', () => {
  const selectors = {
    accordionToggle: () => screen.getByRole('button'),
    accordionContainer: () => screen.getByRole('region'),
    accordionContent: () => screen.queryByText(/Test content/i),
  };
  const renderAccordion = () => {
    const queryClient = new QueryClient();
    const { rerender } = render(
      <QueryClientProvider client={queryClient}>
        <Accordion title="Advanced Testings" id="test-accordion">
          <div>Test content</div>
        </Accordion>
      </QueryClientProvider>,
    );
    return { rerender };
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

  it('should update content when children prop changes', () => {
    const { rerender } = renderAccordion();
    const accordionToggle = selectors.accordionToggle();
    userEvent.click(accordionToggle);
    
    expect(screen.getByText(/Test content/i)).toBeVisible();
    
    const queryClient = new QueryClient();
    rerender(
      <QueryClientProvider client={queryClient}>
        <Accordion title="Advanced Testings" id="test-accordion">
          <div>Updated content</div>
        </Accordion>
      </QueryClientProvider>
    );
    
    expect(screen.getByText(/Updated content/i)).toBeVisible();
    expect(screen.queryByText(/Test content/i)).not.toBeInTheDocument();
  });
});
