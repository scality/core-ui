import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { InputList, InputListProps } from './InputList.component';
import { FormSection } from '../form/Form.component';

describe('InputList', () => {
  const onChangeMock = jest.fn();

  const renderInputList = (props: InputListProps<string[]>) => {
    render(
      <FormSection>
        <InputList
          placeholder="Input list Test"
          onChange={onChangeMock}
          value={props.value}
          name="inputListTest"
        />
      </FormSection>
    );
  };

  beforeEach(() => {
    onChangeMock.mockClear();
  });

  it('should render an empty input list', async () => {
    renderInputList({
      value: [''],
    });
    await waitFor(() => screen.queryAllByRole('img', { hidden: true }));

    expect(screen.getByLabelText('inputListTest0')).toHaveValue('');
  });

  it('should render an input list with initial values', async () => {
    const initialValues = ['Value 1', 'Value 2', 'Value 3'];

    renderInputList({
      value: initialValues,
    });
    await waitFor(() => screen.queryAllByRole('img', { hidden: true }));

    const inputElements = screen.getAllByRole('textbox');

    expect(inputElements).toHaveLength(initialValues.length);

    inputElements.forEach((input, index) => {
      expect(input).toHaveValue(initialValues[index]);
    });
  });

  it('should add a new input when clicking the add button', async () => {
    const initialValues = ['Value 1', 'Value 2'];

    renderInputList({
      value: initialValues,
    });
    await waitFor(() => screen.queryAllByRole('img', { hidden: true }));

    const addButton = screen.getByLabelText('Add1');

    await act(() => fireEvent.click(addButton));

    expect(onChangeMock).toHaveBeenCalledWith({
      target: { value: [...initialValues, ''] },
    });
  });

  it('should delete an input when clicking the delete button', async () => {
    const initialValues = ['Value 1', 'Value 2', 'Value 3'];

    renderInputList({
      value: initialValues,
    });
    await waitFor(() => screen.queryAllByRole('img', { hidden: true }));

    const deleteButton = screen.getByLabelText('Remove1');

    await act(() => fireEvent.click(deleteButton));

    expect(onChangeMock).toHaveBeenCalledWith({
      target: { value: ['Value 1', 'Value 3'] },
    });
  });

  it('should update the value of an input', async () => {
    const initialValues = ['Value 1', 'Value 2', 'Value 3'];

    renderInputList({
      value: initialValues,
    });
    await waitFor(() => screen.queryAllByRole('img', { hidden: true }));

    const inputElements = screen.getAllByRole('textbox');

    const newValue = 'New Value';

    fireEvent.change(inputElements[1], { target: { value: newValue } });

    expect(onChangeMock).toHaveBeenCalledWith({
      target: { value: ['Value 1', newValue, 'Value 3'] },
    });
  });
});
