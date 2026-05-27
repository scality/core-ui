import React, { useState } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getWrapper } from '../../testUtils';
import {
  RadioGroup,
  RadioOption,
} from './RadioGroup.component';

const renderInWrapper = (ui: React.ReactElement) => {
  const { Wrapper } = getWrapper();
  return render(<Wrapper>{ui}</Wrapper>);
};

const defaultOptions: RadioOption[] = [
  { value: 'governance', label: 'Governance' },
  { value: 'compliance', label: 'Compliance' },
  { value: 'none', label: 'None' },
];

const ControlledGroup = ({
  initial = 'governance',
  options = defaultOptions,
  onChange,
  ...rest
}: {
  initial?: string;
  options?: RadioOption[];
  label?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  disabled?: boolean;
  direction?: 'vertical' | 'horizontal';
  onChange?: (v: string) => void;
}) => {
  const [value, setValue] = useState(initial);
  const handleChange = (v: string) => {
    setValue(v);
    onChange?.(v);
  };
  return (
    // @ts-expect-error — union narrowing at the test boundary
    <RadioGroup
      name="retention-mode"
      value={value}
      onChange={handleChange}
      options={options}
      {...rest}
    />
  );
};

describe('RadioGroup', () => {
  it('should show a visible group label when one is provided', () => {
    renderInWrapper(<ControlledGroup label="Retention mode" />);
    const group = screen.getByRole('radiogroup', { name: 'Retention mode' });
    expect(group.tagName).toBe('FIELDSET');
    expect(screen.getByText('Retention mode').tagName).toBe('LEGEND');
  });

  it('should expose an accessible group name when no visible label is used', () => {
    renderInWrapper(<ControlledGroup aria-label="Inline selection" />);
    const group = screen.getByRole('radiogroup', { name: 'Inline selection' });
    expect(group.tagName).toBe('DIV');
  });

  it('should inherit its accessible name from a label rendered outside the group', () => {
    renderInWrapper(
      <>
        <span id="external-label">Retention mode</span>
        <ControlledGroup aria-labelledby="external-label" />
      </>,
    );
    expect(
      screen.getByRole('radiogroup', { name: 'Retention mode' }),
    ).toBeInTheDocument();
  });

  it('should show the selected option as checked', () => {
    renderInWrapper(
      <ControlledGroup label="Retention mode" initial="compliance" />,
    );
    expect(screen.getByLabelText('Governance')).not.toBeChecked();
    expect(screen.getByLabelText('Compliance')).toBeChecked();
    expect(screen.getByLabelText('None')).not.toBeChecked();
  });

  it('should notify the parent when the user picks an option', async () => {
    const onChange = jest.fn();
    renderInWrapper(
      <ControlledGroup label="Retention mode" onChange={onChange} />,
    );
    await userEvent.click(screen.getByLabelText('None'));
    expect(onChange).toHaveBeenCalledWith('none');
    expect(screen.getByLabelText('None')).toBeChecked();
    expect(screen.getByLabelText('Governance')).not.toBeChecked();
  });

  it('should let the user pick only one option at a time', async () => {
    renderInWrapper(<ControlledGroup label="Retention mode" />);
    await userEvent.click(screen.getByLabelText('Compliance'));
    expect(screen.getByLabelText('Compliance')).toBeChecked();
    expect(screen.getByLabelText('Governance')).not.toBeChecked();
    expect(screen.getByLabelText('None')).not.toBeChecked();
  });

  it('should disable every option when the whole group is disabled', () => {
    renderInWrapper(<ControlledGroup label="Retention mode" disabled />);
    expect(screen.getByLabelText('Governance')).toBeDisabled();
    expect(screen.getByLabelText('Compliance')).toBeDisabled();
    expect(screen.getByLabelText('None')).toBeDisabled();
  });

  it('should disable a single option while leaving the others interactive', () => {
    renderInWrapper(
      <ControlledGroup
        label="Retention mode"
        options={[
          { value: 'governance', label: 'Governance' },
          { value: 'compliance', label: 'Compliance', disabled: true },
          { value: 'none', label: 'None' },
        ]}
      />,
    );
    expect(screen.getByLabelText('Governance')).not.toBeDisabled();
    expect(screen.getByLabelText('Compliance')).toBeDisabled();
    expect(screen.getByLabelText('None')).not.toBeDisabled();
  });

  it('should group all options under the same name for keyboard navigation', () => {
    renderInWrapper(<ControlledGroup label="Retention mode" />);
    expect(screen.getByLabelText('Governance')).toHaveAttribute(
      'name',
      'retention-mode',
    );
    expect(screen.getByLabelText('Compliance')).toHaveAttribute(
      'name',
      'retention-mode',
    );
    expect(screen.getByLabelText('None')).toHaveAttribute(
      'name',
      'retention-mode',
    );
  });

  it('should show a tooltip on a disabled option when a reason is provided', async () => {
    renderInWrapper(
      <ControlledGroup
        label="Retention mode"
        options={[
          { value: 'governance', label: 'Governance' },
          {
            value: 'compliance',
            label: 'Compliance',
            disabled: true,
            disabledReason: 'Requires an upgraded license.',
          },
        ]}
      />,
    );
    await userEvent.hover(screen.getByLabelText('Compliance'));
    await waitFor(() => {
      expect(
        screen.getByText('Requires an upgraded license.'),
      ).toBeInTheDocument();
    });
  });
});
