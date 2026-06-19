import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { getWrapper } from '../../testUtils';
import { Button } from '../buttonv2/Buttonv2.component';
import { ButtonGroup } from './ButtonGroup.component';

describe('ButtonGroup', () => {
  const { Wrapper } = getWrapper();

  it('renders its child buttons inside a group', () => {
    render(
      <ButtonGroup>
        <Button value="name" label="Name" />
        <Button value="version" label="Version" />
      </ButtonGroup>,
      { wrapper: Wrapper },
    );

    expect(screen.getByRole('group')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Name' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Version' })).toBeInTheDocument();
  });

  it('marks the selected child as pressed when selection is enabled', () => {
    render(
      <ButtonGroup value="version" onChange={jest.fn()}>
        <Button value="name" label="Name" />
        <Button value="version" label="Version" />
      </ButtonGroup>,
      { wrapper: Wrapper },
    );

    expect(screen.getByRole('button', { name: 'Name' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
    expect(screen.getByRole('button', { name: 'Version' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('calls onChange with the clicked child value', async () => {
    const onChange = jest.fn();
    render(
      <ButtonGroup value="name" onChange={onChange}>
        <Button value="name" label="Name" />
        <Button value="version" label="Version" />
      </ButtonGroup>,
      { wrapper: Wrapper },
    );

    await userEvent.click(screen.getByRole('button', { name: 'Version' }));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('version');
  });

  it('preserves a child onClick handler while still notifying the group', async () => {
    const onChange = jest.fn();
    const childOnClick = jest.fn();
    render(
      <ButtonGroup value={null} onChange={onChange}>
        <Button value="name" label="Name" onClick={childOnClick} />
      </ButtonGroup>,
      { wrapper: Wrapper },
    );

    await userEvent.click(screen.getByRole('button', { name: 'Name' }));

    expect(childOnClick).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('name');
  });

  it('does not mark a valueless child as a toggle button in selectable mode', () => {
    render(
      <ButtonGroup value="name" onChange={jest.fn()}>
        <Button value="name" label="Name" />
        <Button label="Static" />
      </ButtonGroup>,
      { wrapper: Wrapper },
    );

    expect(screen.getByRole('button', { name: 'Name' })).toHaveAttribute(
      'aria-pressed',
    );
    expect(screen.getByRole('button', { name: 'Static' })).not.toHaveAttribute(
      'aria-pressed',
    );
  });

  it('does not inject selection props without onChange', () => {
    render(
      <ButtonGroup>
        <Button value="name" label="Name" />
      </ButtonGroup>,
      { wrapper: Wrapper },
    );

    expect(screen.getByRole('button', { name: 'Name' })).not.toHaveAttribute(
      'aria-pressed',
    );
  });
});
