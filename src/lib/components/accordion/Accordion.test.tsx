import { render, screen, waitFor } from '@testing-library/react';
import React, { useState } from 'react';
import { Accordion } from './Accordion.component';
import userEvent from '@testing-library/user-event';

describe('Accordion', () => {
  const selectors = {
    accordionToggle: () => screen.getByRole('button'),
    accordionContainer: () => screen.getByRole('region'),
    accordionContent: () => screen.queryByText(/Test content/i),
  };
  const SUT = ({ open = false }) => {
    return (
      <Accordion title="Advanced Testings" id="test-accordion" open={open}>
        <div>Test content</div>
      </Accordion>
    );
  };
  const renderAccordion = (open = false) => {
    render(<SUT open={open} />);
  };
  it('should render the Accordion component with title and content', async () => {
    renderAccordion();
    await waitFor(() => screen.findByRole('img', { hidden: true }));

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
    const TestWrapper = () => {
      const [isOpen, setisOpen] = useState(false);
      return (
        <>
          <button onClick={() => setisOpen(!isOpen)}>Test button</button>
          <SUT open={isOpen} />
        </>
      );
    };

    render(<TestWrapper />);

    userEvent.click(screen.getByRole('button', { name: /Test button/i }));
    expect(selectors.accordionContent()).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: /Test button/i }));
    expect(selectors.accordionContent()).not.toBeVisible();
  });
});
