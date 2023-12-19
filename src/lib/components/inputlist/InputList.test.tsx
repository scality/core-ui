import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { InputList, InputListProps } from './InputList.component';
import { FormSection } from '../form/Form.component';
import { QueryClient, QueryClientProvider } from 'react-query';

describe('InputList', () => {
  const onChangeMock = jest.fn();

  const renderInputList = (props: InputListProps<string[]>) => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <FormSection>
          <InputList
            placeholder="Input list Test"
            onChange={onChangeMock}
            value={props.value}
            name="inputListTest"
          />
        </FormSection>
      </QueryClientProvider>,
    );
  };

  beforeEach(() => {
    onChangeMock.mockClear();
  });

  it('should render an empty input list', () => {
    renderInputList({
      value: [''],
    });

    expect(screen.getByLabelText('inputListTest0')).toHaveValue('');
  });

  it('should render an input list with initial values', () => {
    const initialValues = ['Value 1', 'Value 2', 'Value 3'];

    renderInputList({
      value: initialValues,
    });

    const inputElements = screen.getAllByRole('textbox');

    expect(inputElements).toHaveLength(initialValues.length);

    inputElements.forEach((input, index) => {
      expect(input).toHaveValue(initialValues[index]);
    });
  });

  it('should add a new input when clicking the add button', () => {
    const initialValues = ['Value 1', 'Value 2'];

    renderInputList({
      value: initialValues,
    });

    const addButton = screen.getByLabelText('Add1');

    fireEvent.click(addButton);

    expect(onChangeMock).toHaveBeenCalledWith({
      target: { value: [...initialValues, ''] },
    });
  });

  it('should delete an input when clicking the delete button', () => {
    const initialValues = ['Value 1', 'Value 2', 'Value 3'];

    renderInputList({
      value: initialValues,
    });

    const deleteButton = screen.getByLabelText('Remove1');

    fireEvent.click(deleteButton);

    expect(onChangeMock).toHaveBeenCalledWith({
      target: { value: ['Value 1', 'Value 3'] },
    });
  });

  it('should update the value of an input', () => {
    const initialValues = ['Value 1', 'Value 2', 'Value 3'];

    renderInputList({
      value: initialValues,
    });

    const inputElements = screen.getAllByRole('textbox');

    const newValue = 'New Value';

    fireEvent.change(inputElements[1], { target: { value: newValue } });

    expect(onChangeMock).toHaveBeenCalledWith({
      target: { value: ['Value 1', newValue, 'Value 3'] },
    });
  });
});
