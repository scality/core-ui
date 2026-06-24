import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { getWrapper } from '../../testUtils';
import { FormGroup, FormSection } from './Form.component';
import { Input } from '../inputv2/inputv2';

const labelColumn = (labelId: string) =>
  document.getElementById(labelId)?.parentElement;

describe('FormSection responsive', () => {
  const { Wrapper } = getWrapper();

  it('keeps the label column at a fixed width by default', () => {
    render(
      <FormSection>
        <FormGroup id="name" label="Name" content={<Input id="name" />} />
      </FormSection>,
      { wrapper: Wrapper },
    );

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(labelColumn('label-name')).toHaveStyle({ flex: 'none' });
  });

  it('lets the label column shrink when responsive is enabled', () => {
    render(
      <FormSection responsive>
        <FormGroup id="name" label="Name" content={<Input id="name" />} />
      </FormSection>,
      { wrapper: Wrapper },
    );

    const column = labelColumn('label-name');
    expect(column).toHaveStyle({ flex: '0 1 auto' });
    expect(column).toHaveStyle({ minWidth: '0' });
  });
});
