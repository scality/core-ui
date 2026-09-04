import { act, screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Form, FormSection, FormGroup } from './Form.component';

describe('Form', () => {
  it('should submit when pressing Enter on a text input', async () => {
    const onSubmit = jest.fn((e) => e.preventDefault());
    render(
      <Form
        layout={{ kind: 'page', title: 'Test Form' }}
        onSubmit={onSubmit}
        rightActions={<button type="submit">Submit</button>}
      >
        <FormSection>
          <FormGroup
            id="text-field"
            label="Name"
            content={<input type="text" id="text-field" />}
          />
        </FormSection>
      </Form>,
    );

    const input = screen.getByRole('textbox');
    await act(() => userEvent.click(input));
    await act(() => userEvent.keyboard('{Enter}'));

    expect(onSubmit).toHaveBeenCalled();
  });

  it('still submits and keeps fields usable when responsive is enabled', async () => {
    const onSubmit = jest.fn((e) => e.preventDefault());
    render(
      <Form
        layout={{ kind: 'tab' }}
        responsive
        onSubmit={onSubmit}
        rightActions={<button type="submit">Submit</button>}
      >
        <FormSection>
          <FormGroup
            id="name-field"
            label="Name"
            content={<input type="text" id="name-field" />}
          />
        </FormSection>
      </Form>,
    );

    const input = screen.getByRole('textbox');
    await act(() => userEvent.type(input, 'hello'));
    expect(input).toHaveValue('hello');

    await act(() => userEvent.click(screen.getByText('Submit')));
    expect(onSubmit).toHaveBeenCalled();
  });

  // The label's DOM shape carries the help icon's reserved room (see LabelText /
  // HelpIconSlot), so it is layout-bearing and easy to break silently. jsdom has no
  // layout, so the geometry itself is proven by the FormGroupHelpIconOrphan story --
  // what is worth asserting here is that reserving that room did not cost the help
  // affordance its identity or push it out of the label it belongs to.
  it('keeps the help affordance inside the label it annotates', () => {
    render(
      <Form layout={{ kind: 'page', title: 'Test Form' }}>
        <FormSection>
          <FormGroup
            id="tls-field"
            label="Enable LDAP Over TLS"
            labelHelpTooltip="Encrypt the connection to the directory server."
            content={<input type="text" id="tls-field" />}
          />
        </FormSection>
      </Form>,
    );

    const help = screen.getByRole('button', { name: 'More information' });
    expect(
      screen.getByText('Enable LDAP Over TLS').closest('label'),
    ).toContainElement(help);
  });

  it('keeps the labelled field visible and usable with responsive shrink', async () => {
    render(
      <Form layout={{ kind: 'tab' }} responsive>
        <FormSection>
          <FormGroup
            id="email-field"
            label="Email"
            content={<input type="text" id="email-field" />}
          />
        </FormSection>
      </Form>,
    );
    expect(screen.getByText('Email')).toBeVisible();
    const input = screen.getByRole('textbox');
    await act(() => userEvent.type(input, 'x@y.z'));
    expect(input).toHaveValue('x@y.z');
  });
});
