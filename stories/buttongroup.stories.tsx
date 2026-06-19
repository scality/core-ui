import { action } from 'storybook/actions';
import React, { useState } from 'react';
import { Icon, Stack } from '../src/lib';
import { Button, ButtonGroup } from '../src/lib/next';
import { Wrapper, Title } from './common';

export default {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
};

const SORT_OPTIONS = [
  { value: 'name', label: 'Name' },
  { value: 'managedData', label: 'Managed data' },
  { value: 'version', label: 'Version' },
] as const;

const GROUP_OPTIONS = [
  { value: 'label', label: 'Label' },
  { value: 'health', label: 'Health' },
  { value: 'version', label: 'Version' },
] as const;

/**
 * Single-select segmented control — provide `value` + `onChange` and give each
 * child `Button` a `value`. This is the "Sort by" use case from maestro: the
 * selected criterion is highlighted, and re-selecting it toggles the direction.
 */
export const SortBy = () => {
  const [sortBy, setSortBy] = useState<string>('name');
  const [direction, setDirection] = useState<'asc' | 'desc'>('asc');

  const handleChange = (value: string) => {
    if (value === sortBy) {
      setDirection((current) => (current === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(value);
      setDirection('asc');
    }
  };

  return (
    <Wrapper>
      <Title>Sort by</Title>
      <ButtonGroup value={sortBy} onChange={handleChange} aria-label="Sort by">
        {SORT_OPTIONS.map((option) => (
          <Button
            key={option.value}
            value={option.value}
            label={option.label}
            icon={
              sortBy === option.value ? (
                <Icon name={direction === 'asc' ? 'Arrow-up' : 'Arrow-down'} />
              ) : undefined
            }
          />
        ))}
      </ButtonGroup>
    </Wrapper>
  );
};

/**
 * `null` value renders no selection — re-selecting the active option clears it,
 * matching maestro's optional "Group by".
 */
export const GroupByClearable = () => {
  const [groupBy, setGroupBy] = useState<string | null>(null);

  const handleChange = (value: string) => {
    setGroupBy((current) => (current === value ? null : value));
  };

  return (
    <Wrapper>
      <Title>Group by (clearable)</Title>
      <ButtonGroup value={groupBy} onChange={handleChange} aria-label="Group by">
        {GROUP_OPTIONS.map((option) => (
          <Button key={option.value} value={option.value} label={option.label} />
        ))}
      </ButtonGroup>
    </Wrapper>
  );
};

/** Vertical orientation. */
export const Vertical = () => {
  const [value, setValue] = useState<string>('list');

  return (
    <Wrapper>
      <Title>Vertical</Title>
      <ButtonGroup
        orientation="vertical"
        value={value}
        onChange={setValue}
        aria-label="View"
      >
        <Button value="list" label="List" icon={<Icon name="LayerGroup" />} />
        <Button value="network" label="Network" icon={<Icon name="Network" />} />
        <Button value="map" label="Map" icon={<Icon name="Map-marker" />} />
      </ButtonGroup>
    </Wrapper>
  );
};

/**
 * Without `value`/`onChange` the group is a plain visual cluster of buttons;
 * each child keeps its own `onClick`.
 */
export const PlainGroup = () => {
  return (
    <Wrapper>
      <Title>Plain group (no selection)</Title>
      <ButtonGroup aria-label="Pagination">
        <Button label="Previous" onClick={action('previous')} />
        <Button label="1" onClick={action('page-1')} />
        <Button label="2" onClick={action('page-2')} />
        <Button label="Next" onClick={action('next')} />
      </ButtonGroup>
    </Wrapper>
  );
};

export const Playground = () => {
  const [value, setValue] = useState<string>('name');
  return (
    <Wrapper>
      <Stack direction="vertical" gap="r16">
        <ButtonGroup value={value} onChange={setValue}>
          {SORT_OPTIONS.map((option) => (
            <Button
              key={option.value}
              value={option.value}
              label={option.label}
            />
          ))}
        </ButtonGroup>
      </Stack>
    </Wrapper>
  );
};
