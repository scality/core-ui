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
        rightActions={
          <button type="submit">Submit</button>
        }
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

  it('still submits and keeps fields usable when responsive and flipAt are enabled', async () => {
    const onSubmit = jest.fn((e) => e.preventDefault());
    render(
      <Form
        layout={{ kind: 'tab' }}
        responsive
        flipAt={480}
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
});
