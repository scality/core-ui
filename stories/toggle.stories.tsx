import React, { useState } from 'react';
import { Toggle } from '../src/lib/components/toggle/Toggle.component';
import { Title, Wrapper } from './common';
export default {
  title: 'Components/Toggle',
  component: Toggle,
};
export const Default = {
  render: ({}) => {
    const [toggle, setToggle] = useState(false);
    return (
      <Wrapper>
        <Title>Basic toggle</Title>
        <Toggle
          onChange={() => setToggle(!toggle)}
          toggle={toggle}
          name="toggle"
          data-cy="default_toggle"
        />
        <Title>Labelled toggle</Title>
        <Toggle
          label="Airplane Mode"
          onChange={() => setToggle(!toggle)}
          toggle={toggle}
          name="toggle"
          data-cy="default_toggle"
        />
        <Title>Disabled toggle</Title>
        <Toggle
          label="Disabled toggle"
          onChange={() => setToggle(!toggle)}
          toggle={toggle}
          name="toggle"
          data-cy="disabled_toggle"
          disabled={true}
        />
      </Wrapper>
    );
  },
};
