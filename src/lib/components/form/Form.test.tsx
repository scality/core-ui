import { act, screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Form, FormSection, FormGroup } from './Form.component';
import { Select } from '../selectv2/Selectv2.component';

const SelectWrapper = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => (
  <Select value={value} onChange={onChange}>
    <Select.Option value="a">Option A</Select.Option>
    <Select.Option value="b">Option B</Select.Option>
  </Select>
);

describe('Form', () => {
  it('should not submit when pressing Enter on a Select element', async () => {
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
            id="select-field"
            label="Pick one"
            content={<SelectWrapper value="" onChange={() => {}} />}
          />
        </FormSection>
      </Form>,
    );
    await waitFor(() => screen.queryAllByRole('img', { hidden: true }));

    userEvent.tab();
    await act(() => userEvent.keyboard('{Enter}'));

    expect(onSubmit).not.toHaveBeenCalled();
  });

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
});
