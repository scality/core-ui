import React, { useEffect, useRef } from 'react';
import { action } from '@storybook/addon-actions';
import { Checkbox } from '../src/lib/components/checkbox/Checkbox.component';
import { Wrapper, Title } from './common';
export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  decorators:[(story) => (
    <Wrapper style={{minHeight:'10vh', padding:'3rem'}}>
        {story()}
    </Wrapper>) ],
    args:{
      label:'interrested ?',
      onChange:action('Checkbox clicked'),
    }
};

export const DefaultCheckbox = {}

export const IndeterminateCheckbox = {
  render: (args) => {
    const checkboxRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
      if (checkboxRef.current) {
        checkboxRef.current.indeterminate = true;
      }
    }, [checkboxRef]);
    return <Checkbox ref={checkboxRef} {...args}/>
  },
  args:{
    'data-cy':"checked_checkbox",
  }
}

export const CheckedCheckbox = {
  args:{
    checked:true,
    'data-cy':"checked_checkbox",
  }
}

export const UncheckedCheckbox = {
  args:{
    checked:false
  }
}

export const DisabledCheckedCheckbox = {
  args:{
    checked:true,
    disabled:true
  }
}

export const DisabledUncheckedCheckbox = {
  args:{
    checked:false,
    disabled:true
  }
}

/*
export const Default = {
  render: ({}) => {
    const checkboxRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
      if (checkboxRef.current) {
        checkboxRef.current.indeterminate = true;
      }
    }, [checkboxRef]);
    return (
      <Wrapper>
        <Checkbox label="interested?" data-cy="checked_checkbox" />
        <Title>Checkbox indeterminate</Title>
        <Checkbox
          ref={checkboxRef}
          label="interested?"
          onChange={action('checkbox clicked')}
          data-cy="checked_checkbox"
        />
        <Title>Checkbox checked</Title>
        <Checkbox
          checked={true}
          label="interested?"
          onChange={action('checkbox clicked')}
          data-cy="checked_checkbox"
        />
        <Title>Checkbox unchecked</Title>
        <Checkbox
          checked={false}
          label="interested?"
          onChange={action('checkbox clicked')}
        />
        <Title>Checkbox unchecked disabled</Title>
        <Checkbox
          checked={false}
          disabled={true}
          label="interested?"
          onChange={action('checkbox clicked')}
        />
        <Title>Checkbox checked disabled</Title>
        <Checkbox
          checked={true}
          disabled={true}
          label="interested?"
          onChange={action('checkbox clicked')}
        />
      </Wrapper>
    );
  },
}; */
