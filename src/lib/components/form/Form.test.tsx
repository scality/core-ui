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

  /**
   * The marker is appended to the label inside the same Text, so it is the piece
   * that silently falls out of the accessible name -- or loses the space before it
   * -- if that composition is restructured. Tone itself is deliberately not
   * asserted: reading a colour declaration back out proves nothing.
   */
  it.each([
    ['partial', 'User name', true, 'User name *'],
    ['all', 'Description', false, 'Description (optional)'],
  ])(
    'keeps the %s-mode marker in the field accessible name',
    (requireMode, label, required, expected) => {
      render(
        <Form
          layout={{ kind: 'tab' }}
          requireMode={requireMode as 'all' | 'partial'}
        >
          <FormSection>
            <FormGroup
              id="marker-field"
              label={label}
              required={required}
              content={<input type="text" id="marker-field" />}
            />
          </FormSection>
        </Form>,
      );

      expect(screen.getByRole('textbox')).toHaveAccessibleName(expected);
    },
  );

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
